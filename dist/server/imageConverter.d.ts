/** @format */
import { ImageConversionOptions, ConversionResult, ImageFormat } from "../core/types";
/**
 * Convert an image buffer to the specified format with options
 *
 * @param inputBuffer - Buffer containing the image data
 * @param options - Conversion options
 * @returns Promise resolving to the conversion result
 */
export declare const convertImageBuffer: (inputBuffer: Buffer, options: ImageConversionOptions) => Promise<ConversionResult>;
/**
 * Convert an image file to the specified format with options
 *
 * @param inputPath - Path to the input image file
 * @param outputPath - Path where the converted image will be saved
 * @param options - Conversion options
 * @returns Promise resolving to the output file path
 */
export declare const convertImageFile: (inputPath: string, outputPath: string, options: ImageConversionOptions) => Promise<string>;
/**
 * Get the MIME type for an image format
 *
 * @param format - Image format
 * @returns MIME type string
 */
export declare const getMimeType: (format: ImageFormat) => string;
/**
 * Determine if the file is an image based on its extension
 *
 * @param filename - Filename to check
 * @returns Boolean indicating if the file is an image
 */
export declare const isImage: (filename: string) => boolean;
