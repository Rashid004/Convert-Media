/** @format */
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
export declare const createOptimizedImageUrl: (options: CreateOptimizedUrlOptions) => string;
export * from "./react";
export * from "./vue";
export * from "./angular";
