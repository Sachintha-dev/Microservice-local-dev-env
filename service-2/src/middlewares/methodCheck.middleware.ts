import { Request, Response, NextFunction } from "express";

const allowedMethods = ["GET", "HEAD", "POST", "PATCH", "DELETE"];

const methodCheckMiddleware: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = (req: Request, res: Response, next: NextFunction) => {
  if (!allowedMethods.includes(req.method as any)) {
    return res.status(405).send({ error: "Method Not Allowed" });
  }

  next();
};

export default methodCheckMiddleware;
