/** @format */

// src/client/index.ts
import { createOptimizedImageUrl as createReactOptimizedImageUrl } from "./react";
import { createOptimizedImageUrl as createVueOptimizedImageUrl } from "./vue";
import { createOptimizedImageUrl as createAngularOptimizedImageUrl } from "./angular";
import { ImageFormat } from "../core/types";

/**
 * Common options for creating optimized image URLs across frameworks
 */
export interface CreateOptimizedUrlOptions {
  /**
   * Source URL of the original image
   */
  src: string;

  /**
   * Target format for the converted image
   * @default 'webp'
   */
  format?: ImageFormat;

  /**
   * Quality of the output image (1-100)
   * @default 80
   */
  quality?: number;

  /**
   * Width of the output image in pixels
   */
  width?: number;

  /**
   * Height of the output image in pixels
   */
  height?: number;

  /**
   * Base URL for the conversion API endpoint
   * @default '/api/convert'
   */
  apiUrl?: string;
}

/**
 * Framework-agnostic function to create an optimized image URL
 *
 * @param options - Options for creating the optimized URL
 * @returns Optimized image URL
 */
export const createOptimizedImageUrl = (
  options: CreateOptimizedUrlOptions
): string => {
  const {
    src,
    format = "webp",
    quality = 80,
    width,
    height,
    apiUrl = "/api/convert",
  } = options;

  if (!src) {
    return "";
  }

  try {
    // Build the URL for the optimized image
    const params = new URLSearchParams();
    params.append("src", src);
    params.append("format", format);
    params.append("quality", quality.toString());

    if (width) {
      params.append("width", width.toString());
    }

    if (height) {
      params.append("height", height.toString());
    }

    // Create the optimized URL
    return `${apiUrl}?${params.toString()}`;
  } catch (err) {
    console.error("Error creating optimized URL:", err);
    return src;
  }
};

// Export components from each framework
export * from "./react";
export * from "./vue";
export * from "./angular";
