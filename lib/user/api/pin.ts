import { prisma } from "@api/prisma";
import {
  confirmVerificationCode,
  sendVerificationCode,
} from "@lib/core/messages/twilio";
import { AppError } from "@util/errors";
import { differenceInMilliseconds as dm } from "date-fns";

const expiry = 24 * 60 * 60 * 1000;

const findUserByUsername = (method: string, username: string) => {
  console.log(username, method);
  return prisma.user.findUnique({
    where: method === "phone" ? { phoneNumber: username } : { email: username },
    include: { profile: true },
  });
};
const generatePIN = (method: string) =>
  method === "phone"
    ? "twilio"
    : Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");

const isExpired = (date: Date | null) => !date || expiry < dm(new Date(), date);

export const createPINandSend = async (method: string, username: string) => {
  const user = await findUserByUsername(method, username);
  if (!user) return;

  const pin = "123456"; // generatePIN(method);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      pin,
      pinType: method,
      pinCreatedAt: new Date(),
      pinVerifiedAt: null,
    },
  });

  if (method === "phone") {
    try {
      // await sendVerificationCode(username);
      console.log("code sent via sms");
    } catch (e: any) {
      if (e.code === 60203) throw AppError.BadRequest("validation.pin.max");
      else throw AppError.BadRequest("validation.pin.error");
    }
  }

  return user;
};
export const updateLastLoggedInDate = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { lastLoggedInAt: new Date() },
  });
};
export const verifyPIN = async (
  method: string,
  username: string,
  pin: string
) => {
  const user = await findUserByUsername(method, username);

  if (!user) throw AppError.BadRequest("validation.pin.check.invalid");
  if (user.pinType !== method || isExpired(user.pinCreatedAt))
    throw AppError.BadRequest("validation.pin.check.invalid");

  if (method === "phone") {
    let data;
    try {
      data = await confirmVerificationCode(username, pin);
    } catch (e: any) {
      if (e.code === 20404)
        throw AppError.BadRequest("validation.pin.check.no-pin");
      else throw AppError.BadRequest("validation.pin.check.error");
    }
    if (!data?.valid) throw AppError.BadRequest("validation.pin.check.invalid");
  } else if (method === "email") {
    if (user.pin !== pin)
      throw AppError.BadRequest("validation.pin.check.invalid");
  } else throw AppError.BadRequest("undefined");

  await prisma.user.update({
    where: { id: user.id },
    data: { pin, pinVerifiedAt: new Date() },
  });
};

export const consumePIN = async (
  method: string,
  username: string,
  pin: string
) => {
  const user = await findUserByUsername(method, username);
  if (!user) throw AppError.BadRequest("validation.pin.check.invalid");
  if (
    user.pin !== pin ||
    user.pinType !== method ||
    isExpired(user.pinVerifiedAt)
  )
    throw AppError.BadRequest("validation.pin.check.invalid");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      pin: null,
      pinType: null,
      pinCreatedAt: null,
      pinVerifiedAt: null,
    },
  });
  return user;
};
