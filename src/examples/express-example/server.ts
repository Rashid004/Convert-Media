/** @format */

// examples/express-example/server.js
import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { createImageConversionMiddleware } from "convert-media";

const app = express();
const port = process.env.PORT || 3000;

// Set up file uploads middleware
app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
    abortOnLimit: true,
  })
);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Initialize the image conversion middleware
app.use(
  createImageConversionMiddleware({
    cacheDuration: 60 * 60 * 24, // 1 day (in seconds)
    debug: true, // Enable debug logging
    basePath: "/api/convert", // Base path for the conversion endpoint
  })
);

// Basic route for testing
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Convert Media Example</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .image-container { margin-bottom: 30px; }
        .image-grid { display: flex; flex-wrap: wrap; gap: 20px; }
        .image-item { flex: 1 0 200px; }
        h1, h2 { color: #333; }
        form { margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 5px; }
        button { padding: 10px 15px; background: #4CAF50; color: white; border: none; cursor: pointer; }
      </style>
    </head>
    <body>
      <h1>Convert Media Example</h1>
      
      <div class="image-container">
        <h2>Original Image</h2>
        <img src="/sample.jpg" alt="Original sample image" width="400">
      </div>
      
      <div class="image-container">
        <h2>WebP Conversion</h2>
        <img src="/api/convert?src=/sample.jpg&format=webp&quality=85" alt="WebP sample image" width="400">
      </div>
      
      <div class="image-container">
        <h2>Resized PNG Conversion</h2>
        <img src="/api/convert?src=/sample.jpg&format=png&quality=90&width=300" alt="PNG sample image" width="300">
      </div>
      
      <div class="image-container">
        <h2>Upload and Convert</h2>
        <form action="/upload" method="post" enctype="multipart/form-data">
          <input type="file" name="image" accept="image/*" required>
          <select name="format">
            <option value="webp">WebP</option>
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="avif">AVIF</option>
          </select>
          <label>
            Quality:
            <input type="range" name="quality" min="1" max="100" value="80">
          </label>
          <button type="submit">Upload & Convert</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Handle image uploads
app.post("/upload", (req, res) => {
  if (!req.files || !req.files.image) {
    return res.status(400).send("No image uploaded");
  }

  const uploadedImage = req.files.image;
  const format = req.body.format || "webp";
  const quality = parseInt(req.body.quality || "80", 10);

  // Save the uploaded file
  const savePath = path.join(
    __dirname,
    "public",
    "uploads",
    uploadedImage.name
  );
  uploadedImage.mv(savePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Redirect to a page that shows the converted image
    res.redirect(
      `/view-converted?filename=${encodeURIComponent(
        uploadedImage.name
      )}&format=${format}&quality=${quality}`
    );
  });
});

// View converted image page
app.get("/view-converted", (req, res) => {
  const { filename, format, quality } = req.query;

  if (!filename) {
    return res.status(400).send("No filename provided");
  }

  const uploadedPath = `/uploads/${filename}`;
  const conversionUrl = `/api/convert?src=${encodeURIComponent(
    uploadedPath
  )}&format=${format || "webp"}&quality=${quality || "80"}`;

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Converted Image</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .image-container { margin-bottom: 30px; }
        .image-comparison { display: flex; gap: 20px; flex-wrap: wrap; }
        .image-item { flex: 1 0 300px; }
        h1, h2 { color: #333; }
        .back-link { display: inline-block; margin-top: 20px; color: #4CAF50; text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>Image Conversion Result</h1>
      
      <div class="image-comparison">
        <div class="image-item">
          <h2>Original Image</h2>
          <img src="${uploadedPath}" alt="Original uploaded image" style="max-width: 100%">
        </div>
        
        <div class="image-item">
          <h2>Converted Image (${format || "webp"}, quality: ${
    quality || "80"
  })</h2>
          <img src="${conversionUrl}" alt="Converted image" style="max-width: 100%">
        </div>
      </div>
      
      <a href="/" class="back-link">← Back to home</a>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
