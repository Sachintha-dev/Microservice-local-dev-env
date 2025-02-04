import { isCelebrateError } from "celebrate";
import { Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: any) => {
  let error = { ...err };
  console.log("Error: ", err);
  error.message = err.message;
  let isCelebrateErrMsgSet = false;

  /** Celebrate input error handling */
  if (isCelebrateError(err) && error.details) {
    let errorDetails: any;
    const errorBody = error.details.get("body");
    if (errorBody) {
      const {
        details: [bodyErrorDetails],
      } = errorBody;
      errorDetails = bodyErrorDetails;
      errorDetails.type = "body";
    }

    const errorQuery = error.details.get("query");
    if (errorQuery) {
      const {
        details: [queryErrorDetails],
      } = errorQuery;
      errorDetails = queryErrorDetails;
      errorDetails.type = "query";
    }

    const errorParams = error.details.get("params");
    if (errorParams) {
      const {
        details: [paramsErrorDetails],
      } = errorParams;
      errorDetails = paramsErrorDetails;
      errorDetails.type = "params";
    }

    if (errorDetails) {
      error.message = `${errorDetails.message} in request ${errorDetails.type} as "${errorDetails.context.key}"`;
      error.status = 400;
      isCelebrateErrMsgSet = true;
    }
  }

  console.log(error);
  if (error.statusCode == 401) {
    res
      .status(error.statusCode)
      .json({ code: error.statusCode, success: false, message: error.message });
    next();
  } else if (error.code == "P2002") {
    res.status(400).json({
      code: 400,
      success: false,
      message: "Unique Value Validation " + error.meta.target,
    });
    next();
  } else {
    res.status(500).json({ code: 500, success: false, message: error.message });
    next();
  }
  // if (!error.status)
  // if(error.status = 500) {
  // const statusCode = error.status;
  // error =
  //   error.message && error.message.length > 50 && !isCelebrateErrMsgSet
  //     ? "Failed"
  //     : error.message || "Failed";

  // res
  //   .status(statusCode)
  //   .json({ code: statusCode, success: false, message: error });
  // next();
  // }
};

export default errorHandler;
