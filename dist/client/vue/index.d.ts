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
export declare const createOptimizedImageUrl: (options: OptimizedImageProps) => string;
export declare const OptimizedImage: {
    name: string;
    props: {
        src: {
            type: StringConstructor;
            required: boolean;
        };
        format: {
            type: StringConstructor;
            default: string;
        };
        quality: {
            type: NumberConstructor;
            default: number;
        };
        width: {
            type: NumberConstructor;
        };
        height: {
            type: NumberConstructor;
        };
        apiUrl: {
            type: StringConstructor;
            default: string;
        };
        alt: {
            type: StringConstructor;
            default: string;
        };
        lazy: {
            type: BooleanConstructor;
            default: boolean;
        };
    };
    setup(props: OptimizedImageProps): {
        optimizedSrc: string;
    };
};
