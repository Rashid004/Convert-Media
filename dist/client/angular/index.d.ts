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
export declare const createOptimizedImageUrl: (options: OptimizedImageOptions) => string;
export declare const OptimizedImageDirective: {
    selector: string;
    inputs: string[];
    factory: () => {};
};
