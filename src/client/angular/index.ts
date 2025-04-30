/** @format */

import { ImageFormat } from "../../core/types";

export interface OptimizedImageOptions {
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
 * Create optimized image URL for Angular applications
 *
 * @param options - Image optimization options
 * @returns Optimized image URL
 */
export const createOptimizedImageUrl = (
  options: OptimizedImageOptions
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

// Note: This is a placeholder for the actual Angular implementation
// In a real implementation, you would use Angular's Component decorator
export const OptimizedImageDirective = {
  selector: "[optimizedImage]",
  inputs: [
    "src",
    "format",
    "quality",
    "width",
    "height",
    "apiUrl",
    "alt",
    "lazy",
  ],

  // This would be filled out with Angular-specific implementation
  factory: () => {
    return {};
  },
};
