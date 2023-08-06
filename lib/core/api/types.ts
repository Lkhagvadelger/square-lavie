import { User } from "@prisma/client";
import { AppError } from "@util/errors";
import { NextApiRequest, NextApiResponse } from "next";

export type AppRequest = Express.Request &
  NextApiRequest & {
    session: { id: string; userId?: string };
    user: User;
  };

export type AppResponse = NextApiResponse & {
  sendSuccess: (data?: Record<string, any> | null) => void;
  sendError: (
    error: AppError | number | unknown,
    message?: string,
    translationKey?: string,
    isOperational?: boolean
  ) => void;
};
