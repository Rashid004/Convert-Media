/** @format */
interface VideoConversionOptions {
    format?: string;
    quality?: number;
}
export declare const convertVideo: (inputPath: string, outputPath: string, options: VideoConversionOptions) => Promise<string>;
export declare const isVideo: (filename: string) => boolean;
export {};
