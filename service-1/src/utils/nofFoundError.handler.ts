import httpStatus from "http-status";
import ErrorResponse from "./errorResponse.util";

// handle resource not found errors
export const resourceNotFound = (req: any, res: any, next: any) => {
  throw new ErrorResponse("Requested Resource Not Found", httpStatus.NOT_FOUND);
};
