/** @format */
interface ImageConversionOptions {
    format: "webp" | "png" | "jpg" | "avif" | "jpeg" | "tiff";
    quality?: number;
}
export declare const convertImage: (inputBuffer: Buffer, options: ImageConversionOptions) => Promise<Buffer>;
export {};
