import { CustomError } from "ts-custom-error";

export class AppError extends CustomError {
  public constructor(
    public statusCode: number,
    message?: string,
    public translationKey?: string,
    public isOperational = false,
    public stack = "",
    public status = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.translationKey = translationKey;
    this.isOperational = isOperational;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    if (stack) this.stack = stack;
    else if (Error.captureStackTrace)
      Error.captureStackTrace(this, this.constructor);
    else this.stack = new Error().stack!;
  }

  static BadRequest = (msg?: string) =>
    new AppError(400, ERROR_MESSAGES.BAD_REQUEST, msg || "undefined");
  static Unauthorized = (msg?: string) =>
    new AppError(401, ERROR_MESSAGES.UNAUTHORIZED, msg || "not-logged-in");
  static Forbidden = (msg?: string) =>
    new AppError(403, ERROR_MESSAGES.FORBIDDEN, msg || "forbidden");
  static NotFound = (msg?: string) =>
    new AppError(404, ERROR_MESSAGES.NOT_FOUND, msg || "not-found");
  static Conflict = (msg?: string) =>
    new AppError(409, ERROR_MESSAGES.CONFLICT, msg || "undefined");
  static InternalServerError = (msg?: string) =>
    new AppError(500, ERROR_MESSAGES.INTERNAL_SERVER_ERROR, msg || "undefined");
  static NotImplemented = () =>
    new AppError(501, ERROR_MESSAGES.NOT_IMPLEMENTED, "not-implemented");
}

export const ERROR_MESSAGES = {
  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "Unauthorized",
  PAYMENT_REQUIRED: "Payment Required",
  FORBIDDEN: "Forbidden",
  NOT_FOUND: "Not Found",
  METHOD_NOT_ALLOWED: "Method Not Allowed",
  UNPROCESSABLE_ENTITY: "Unprocessable Entity",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  NOT_IMPLEMENTED: "Not Implemented",
  BAD_GATEWAY: "Bad Gateway",
  SERVICE_UNAVAILABLE: "Service Unavailable",
  GATEWAY_TIMEOUT: "Gateway Timeout",
  CONFLICT: "Conflict",
};
