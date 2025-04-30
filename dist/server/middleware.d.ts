/** @format */
import { Request, Response, NextFunction } from "express";
import { ServerMiddlewareConfig } from "../core/types";
/**
 * Creates an Express middleware for image conversion
 *
 * @param config - Middleware configuration
 * @returns Express middleware function
 */
export declare const createImageConversionMiddleware: (config?: ServerMiddlewareConfig) => (req: Request, res: Response, next: NextFunction) => Promise<any>;
