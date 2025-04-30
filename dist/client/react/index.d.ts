/** @format */
import React, { ComponentType } from "react";
import { ImageFormat } from "../../core/types";
/**
 * Create optimized image URL
 */
export declare const createOptimizedImageUrl: (options: {
    src: string;
    format?: ImageFormat;
    quality?: number;
    width?: number;
    height?: number;
    apiUrl?: string;
}) => string;
/**
 * Props for the OptimizedImage component
 */
export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
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
    convertWidth?: number;
    /**
     * Height of the output image in pixels
     */
    convertHeight?: number;
    /**
     * Base URL for the conversion API endpoint
     * @default '/api/convert'
     */
    apiUrl?: string;
    /**
     * Whether to lazy load the image
     * @default true
     */
    lazy?: boolean;
    /**
     * Callback when the image is loaded
     */
    onImageLoad?: () => void;
    /**
     * Callback when there's an error loading the image
     */
    onImageError?: (error: Error) => void;
}
/**
 * A React component that optimizes images by converting them to a specified format
 */
export declare const OptimizedImage: React.FC<OptimizedImageProps>;
/**
 * Props that will be extracted and handled by the optimization HOC
 */
type OptimizationProps = {
    src?: string;
    format?: ImageFormat;
    quality?: number;
    convertWidth?: number;
    convertHeight?: number;
    apiUrl?: string;
};
/**
 * HOC that enhances an existing image component with optimization capabilities
 *
 * @param ImageComponent - The component to enhance
 * @returns Enhanced component with optimization
 */
export declare function withImageOptimization<P extends {
    src?: string;
}>(ImageComponent: ComponentType<P>): React.ForwardRefExoticComponent<React.PropsWithoutRef<Omit<P, "src"> & OptimizationProps> & React.RefAttributes<unknown>>;
export {};
