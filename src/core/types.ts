/** @format */

// src/core/types.ts

/**
 * Supported image formats for conversion
 */
export type ImageFormat = "webp" | "png" | "jpg" | "jpeg" | "avif";

/**
 * Options for image conversion
 */
export interface ImageConversionOptions {
  /**
   * Target format for the converted image
   */
  format: ImageFormat;

  /**
   * Quality of the output image (1-100)
   * Higher values mean better quality but larger file size
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
   * Whether to preserve aspect ratio when resizing
   * @default true
   */
  preserveAspectRatio?: boolean;
}

/**
 * Result of image conversion
 */
export interface ConversionResult {
  /**
   * Converted image as a Buffer
   */
  data: Buffer;

  /**
   * MIME type of the converted image
   */
  mimeType: string;

  /**
   * Size of the converted image in bytes
   */
  size: number;

  /**
   * Format of the converted image
   */
  format: ImageFormat;
}

/**
 * Configuration for the server middleware
 */
export interface ServerMiddlewareConfig {
  /**
   * Cache duration in seconds
   * @default 86400 (1 day)
   */
  cacheDuration?: number;

  /**
   * Whether to enable debug logging
   * @default false
   */
  debug?: boolean;

  /**
   * Base URL path for the conversion endpoint
   * @default '/api/convert'
   */
  basePath?: string;
}
