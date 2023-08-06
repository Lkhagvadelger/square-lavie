import { AppError } from "@util/errors";
import { AppRequest, AppResponse } from "../types";
import * as Sentry from "@sentry/nextjs";

const isDev = process.env.NODE_ENV !== "production";

const assertAppError = (error: unknown): error is AppError => {
  return true;
};

export const responseMiddleware = (
  _req: AppRequest,
  res: AppResponse,
  next: () => void
) => {
  res.sendError = (
    error: AppError | number | unknown,
    message?: string,
    translationKey?: string,
    isOperational = true
  ) => {
    if (typeof error === "number")
      error = new AppError(error, message, translationKey, isOperational);

    if (isDev) console.error(error);

    if (assertAppError(error)) {
      if (!isDev && (!error.statusCode || error.statusCode === 500))
        Sentry.captureException(error);

      res.status(error.statusCode || 500).json({
        status: error.status,
        message: error.message,
        translationKey: error.translationKey,
        stack: error.stack,
      });
    } else res.status(500).json({ message: "Unknown error" });
  };

  res.sendSuccess = (data?: Record<string, any> | null) => {
    if (data) res.status(200).json(data);
    else res.status(200).send("");
  };

  next();
};
