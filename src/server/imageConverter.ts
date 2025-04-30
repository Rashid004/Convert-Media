/** @format */

// src/server/imageConverter.ts
import sharp from "sharp";
import fs from "fs-extra";
import path from "path";
import {
  ImageConversionOptions,
  ConversionResult,
  ImageFormat,
} from "../core/types";

/**
 * Convert an image buffer to the specified format with options
 *
 * @param inputBuffer - Buffer containing the image data
 * @param options - Conversion options
 * @returns Promise resolving to the conversion result
 */
export const convertImageBuffer = async (
  inputBuffer: Buffer,
  options: ImageConversionOptions
): Promise<ConversionResult> => {
  const {
    format,
    quality = 80,
    width,
    height,
    preserveAspectRatio = true,
  } = options;

  let sharpInstance = sharp(inputBuffer);

  // Apply resizing if specified
  if (width || height) {
    sharpInstance = sharpInstance.resize({
      width,
      height,
      fit: preserveAspectRatio ? "inside" : "fill",
    });
  }

  // Get MIME type for the format
  const mimeType = getMimeType(format);

  // Apply format conversion
  let outputBuffer: Buffer;
  switch (format) {
    case "webp":
      outputBuffer = await sharpInstance.webp({ quality }).toBuffer();
      break;
    case "png":
      outputBuffer = await sharpInstance.png({ quality }).toBuffer();
      break;
    case "jpg":
    case "jpeg":
      outputBuffer = await sharpInstance.jpeg({ quality }).toBuffer();
      break;
    case "avif":
      outputBuffer = await sharpInstance.avif({ quality }).toBuffer();
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }

  return {
    data: outputBuffer,
    mimeType,
    size: outputBuffer.length,
    format,
  };
};

/**
 * Convert an image file to the specified format with options
 *
 * @param inputPath - Path to the input image file
 * @param outputPath - Path where the converted image will be saved
 * @param options - Conversion options
 * @returns Promise resolving to the output file path
 */
export const convertImageFile = async (
  inputPath: string,
  outputPath: string,
  options: ImageConversionOptions
): Promise<string> => {
  // Read the input file
  const inputBuffer = await fs.readFile(inputPath);

  // Convert the image
  const result = await convertImageBuffer(inputBuffer, options);

  // Ensure the output directory exists
  await fs.ensureDir(path.dirname(outputPath));

  // Write the output file
  await fs.writeFile(outputPath, result.data);

  return outputPath;
};

/**
 * Get the MIME type for an image format
 *
 * @param format - Image format
 * @returns MIME type string
 */
export const getMimeType = (format: ImageFormat): string => {
  switch (format) {
    case "webp":
      return "image/webp";
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "avif":
      return "image/avif";
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

/**
 * Determine if the file is an image based on its extension
 *
 * @param filename - Filename to check
 * @returns Boolean indicating if the file is an image
 */
export const isImage = (filename: string): boolean => {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
    ".gif",
    ".svg",
  ];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
};
