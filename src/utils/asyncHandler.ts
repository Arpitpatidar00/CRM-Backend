import { Request, Response, NextFunction, RequestHandler } from "express";
import { ApiResponse } from "./ApiResponse";

export const asyncHandler = <P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
  fn: (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction) => Promise<any>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then((result) => {
        if (result && !res.headersSent) {
          if (result instanceof ApiResponse) {
            res.status(result.statusCode).json(result as unknown as ResBody);
          } else {
            res.status(200).json(result);
          }
        }
      })
      .catch(next);
  };
};
