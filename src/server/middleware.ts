/** @format */

// src/server/middleware.ts
import { Request, Response, NextFunction } from "express";
import path from "path";
import crypto from "crypto";
import fs from "fs-extra";
import { ServerMiddlewareConfig, ImageConversionOptions } from "../core/types";
import { convertImageBuffer } from "./imageConverter";

/**
 * Creates an Express middleware for image conversion
 *
 * @param config - Middleware configuration
 * @returns Express middleware function
 */
export const createImageConversionMiddleware = (
  config?: ServerMiddlewareConfig
) => {
  const {
    cacheDuration = 86400, // 1 day default
    debug = false,
    basePath = "/api/convert",
  } = config || {};

  // Create cache directory if it doesn't exist
  const cacheDir = path.resolve(process.cwd(), ".image-cache");
  fs.ensureDirSync(cacheDir);

  if (debug) {
    console.log(`[convert-media] Cache directory: ${cacheDir}`);
    console.log(`[convert-media] Cache duration: ${cacheDuration} seconds`);
    console.log(`[convert-media] Base path: ${basePath}`);
  }

  return async (req: Request, res: Response, next: NextFunction) => {
    // Only handle requests to the configured base path
    if (!req.path.startsWith(basePath)) {
      return next();
    }

    try {
      // Parse query parameters
      const src = req.query.src as string;
      const format = (req.query.format || "webp") as string;
      const quality = parseInt((req.query.quality as string) || "80", 10);
      const width = req.query.width
        ? parseInt(req.query.width as string, 10)
        : undefined;
      const height = req.query.height
        ? parseInt(req.query.height as string, 10)
        : undefined;

      // Validate required parameters
      if (!src) {
        return res.status(400).json({ error: "Missing src parameter" });
      }

      // Validate format
      if (!["webp", "png", "jpg", "jpeg", "avif"].includes(format)) {
        return res.status(400).json({ error: "Invalid format" });
      }

      // Create a cache key based on the parameters
      const cacheKey = crypto
        .createHash("md5")
        .update(`${src}|${format}|${quality}|${width}|${height}`)
        .digest("hex");

      const cachePath = path.join(cacheDir, `${cacheKey}.${format}`);

      // Check if the file exists in cache and is not expired
      if (await fs.pathExists(cachePath)) {
        const stats = await fs.stat(cachePath);
        const now = new Date().getTime();
        const fileTime = stats.mtime.getTime();

        // If the file is not expired, serve from cache
        if ((now - fileTime) / 1000 < cacheDuration) {
          if (debug) {
            console.log(`[convert-media] Serving from cache: ${cachePath}`);
          }
          return res.sendFile(cachePath);
        }
      }

      if (debug) {
        console.log(`[convert-media] Converting image: ${src} to ${format}`);
      }

      // Conversion options
      const options: ImageConversionOptions = {
        format: format as any,
        quality,
        width,
        height,
      };

      // Try to load from local path (relative to server)
      try {
        const localPath = path.resolve(
          process.cwd(),
          src.startsWith("/") ? src.slice(1) : src
        );
        const buffer = await fs.readFile(localPath);
        const result = await convertImageBuffer(buffer, options);

        // Save to cache
        await fs.writeFile(cachePath, result.data);

        // Set appropriate headers
        res.set("Content-Type", result.mimeType);
        res.set("Cache-Control", `public, max-age=${cacheDuration}`);

        // Send the converted image
        return res.send(result.data);
      } catch (err) {
        return res.status(404).json({ error: "Image not found" });
      }
    } catch (error) {
      console.error("[convert-media] Error:", error);
      return res.status(500).json({ error: "Image conversion failed" });
    }
  };
};
