<!-- @format -->

# Convert Media

A simple yet powerful image conversion library for modern web applications. Convert Media provides server-side image processing with client-side integration for React, Vue, Angular, and other frameworks.

## Features

- **Image Optimization**: Convert images to WebP, AVIF, PNG, or JPEG formats with quality control
- **Server-Side Processing**: All conversion happens server-side for optimal performance
- **Framework Support**: Ready-to-use components for React, Vue, and Angular
- **Express Middleware**: Easy integration with Express.js
- **Flexible API**: Use standalone or with your favorite framework
- **Caching**: Built-in caching system to improve performance
- **Resizing**: Resize images while maintaining aspect ratio

## Installation

```bash
npm install convert-media
```

## Quick Start

### Server Setup (Express)

```javascript
import express from "express";
import { createImageConversionMiddleware } from "convert-media";

const app = express();

// Initialize the image conversion middleware
app.use(
  createImageConversionMiddleware({
    cacheDuration: 86400, // 1 day (in seconds)
    debug: true, // Enable debug logging
    basePath: "/api/convert", // Base path for the conversion endpoint
  })
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### React Component

```jsx
import React from "react";
import { OptimizedImage } from "convert-media";

function App() {
  return (
    <div className="app">
      <h1>Image Optimization Example</h1>

      <OptimizedImage
        src="/images/sample.jpg"
        format="webp"
        quality={85}
        alt="Sample optimized image"
        width={400}
        height={300}
      />
    </div>
  );
}
```

### Using with Other Frameworks

```javascript
import { createOptimizedImageUrl } from "convert-media";

// Create optimized URL for any framework
const optimizedUrl = createOptimizedImageUrl({
  src: "/images/sample.jpg",
  format: "webp",
  quality: 85,
  width: 400,
});

// Use the URL in any framework
// Vue Example:
// <img :src="optimizedUrl" alt="Optimized image" />
```

## API Reference

### Server API

#### `createImageConversionMiddleware(config?)`

Creates an Express middleware for image conversion.

**Parameters:**

- `config` (optional): Configuration options
  - `cacheDuration`: Cache duration in seconds (default: 86400 - 1 day)
  - `debug`: Enable debug logging (default: false)
  - `basePath`: Base URL path for the conversion endpoint (default: '/api/convert')

**Returns:** Express middleware function

#### `convertImageBuffer(inputBuffer, options)`

Converts an image buffer to the specified format.

**Parameters:**

- `inputBuffer`: Buffer containing the image data
- `options`: Conversion options
  - `format`: Target format ('webp', 'png', 'jpg', 'jpeg', 'avif')
  - `quality`: Quality of the output image (1-100, default: 80)
  - `width`: Width of the output image in pixels (optional)
  - `height`: Height of the output image in pixels (optional)
  - `preserveAspectRatio`: Whether to preserve aspect ratio (default: true)

**Returns:** Promise resolving to the conversion result

#### `convertImageFile(inputPath, outputPath, options)`

Converts an image file to the specified format.

**Parameters:**

- `inputPath`: Path to the input image file
- `outputPath`: Path where the converted image will be saved
- `options`: Conversion options (same as `convertImageBuffer`)

**Returns:** Promise resolving to the output file path

#### `convertImageFromUrl(imageUrl, options)`

Converts an image from a URL to the specified format.

**Parameters:**

- `imageUrl`: URL of the image to convert
- `options`: Conversion options (same as `convertImageBuffer`)

**Returns:** Promise resolving to the conversion result

### React Components

#### `<OptimizedImage />`

A React component that optimizes images by converting them to a specified format.

**Props:**

- `src`: Source URL of the original image
- `format`: Target format ('webp', 'png', 'jpg', 'jpeg', 'avif') (default: 'webp')
- `quality`: Quality of the output image (1-100) (default: 80)
- `convertWidth`: Width of the output image in pixels (optional)
- `convertHeight`: Height of the output image in pixels (optional)
- `apiUrl`: Base URL for the conversion API endpoint (default: '/api/convert')
- `lazy`: Whether to lazy load the image (default: true)
- `onImageLoad`: Callback when the image is loaded
- `onImageError`: Callback when there's an error loading the image
- All standard HTML img attributes

#### `withImageOptimization(Component)`

Higher-order component that enhances an existing image component with optimization capabilities.

**Parameters:**

- `Component`: The component to enhance

**Returns:** Enhanced component with optimization

### Utility Functions

#### `createOptimizedImageUrl(options)`

Creates an optimized image URL.

**Parameters:**

- `options`: Options for creating the optimized URL
  - `src`: Source URL of the original image
  - `format`: Target format (default: 'webp')
  - `quality`: Quality of the output image (default: 80)
  - `width`: Width of the output image in pixels (optional)
  - `height`: Height of the output image in pixels (optional)
  - `apiUrl`: Base URL for the conversion API endpoint (default: '/api/convert')

**Returns:** Optimized image URL string

## Examples

Check out the examples in the `/examples` directory for more detailed usage examples:

- React integration (`/examples/react-example`)
- Express server implementation (`/examples/express-example`)
- Node.js CLI usage (`/examples/node-example`)

## Browser Support

The server-side components work with any browser. The client-side components require:

- React 16.8+ for React components
- Modern browsers that support ES6 features
- For WebP/AVIF viewing support, check [Can I Use](https://caniuse.com/)

## License

MIT
