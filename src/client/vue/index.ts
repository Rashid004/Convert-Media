/** @format */

import { ImageFormat } from "../../core/types";

export interface OptimizedImageProps {
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

  /**
   * Alternative text for the image
   */
  alt?: string;

  /**
   * Whether to lazy load the image
   * @default true
   */
  lazy?: boolean;
}

/**
 * Create optimized image URL for Vue applications
 *
 * @param options - Image optimization options
 * @returns Optimized image URL
 */
export const createOptimizedImageUrl = (
  options: OptimizedImageProps
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

// Note: This is a placeholder for the actual Vue component implementation
// In a real implementation, you would use Vue's component definition syntax
export const OptimizedImage = {
  name: "OptimizedImage",
  props: {
    src: { type: String, required: true },
    format: { type: String, default: "webp" },
    quality: { type: Number, default: 80 },
    width: { type: Number },
    height: { type: Number },
    apiUrl: { type: String, default: "/api/convert" },
    alt: { type: String, default: "" },
    lazy: { type: Boolean, default: true },
  },

  setup(props: OptimizedImageProps) {
    const optimizedSrc = createOptimizedImageUrl(props);

    return {
      optimizedSrc,
    };
  },
};
