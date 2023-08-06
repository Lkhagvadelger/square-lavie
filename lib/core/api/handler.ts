import nc from "next-connect";
import { passport } from "./middlewares/passport";
import { responseMiddleware } from "./middlewares/response";
import { sessionMiddleware } from "./middlewares/session";
import { trustProxyMiddleware } from "./middlewares/trust-proxy";
import { AppRequest, AppResponse } from "./types";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const middlewares = [
  trustProxyMiddleware,
  responseMiddleware,
  sessionMiddleware,
  passport.initialize(),
  passport.session(),
];

export const createHandler = (options = {}) => {
  return nc<AppRequest, AppResponse>({
    onError: (err, _req, res: AppResponse) => {
      res.sendError(err);
    },
    onNoMatch: (_req, res) => {
      res.status(404).end("Page is not found");
    },
    ...options,
  }).use(...middlewares);
};
