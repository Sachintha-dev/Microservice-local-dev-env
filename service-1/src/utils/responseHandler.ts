import { Response, NextFunction } from "express";
import LoggerInstance from "./logger";

/**
 *
 * @class ResponseHandler
 */
class ResponseHandler {
  /**
   * Standardized response handler for success
   * @param res - Express Response object
   * @param statusCode - HTTP Status code
   * @param message - Success message
   * @param data - Payload data (optional)
   */
  public static sendSuccessResponse(
    res: Response,
    statusCode: number,
    message: string,
    data?: any
  ) {
    return res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  }

  /**
   * Standardized error handler for catching errors
   * @param res - Express Response object
   * @param next - Express NextFunction for error forwarding
   * @param error - Error object
   */
  public static sendErrorResponse(
    res: Response,
    next: NextFunction,
    error: any,
    status?: number
  ) {
    LoggerInstance.error(error.message);
    res.status(status || 500).json({
      status: "error",
      errors: error.errors,
      message:
        error.message ||
        "An internal server error occurred Please check the error log for more details",
    });
  }
}

export default ResponseHandler;
