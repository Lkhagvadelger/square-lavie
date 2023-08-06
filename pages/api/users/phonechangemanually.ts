import { createHandler } from "@api/handler";
import { faker } from "@faker-js/faker";
import {
  changePhoneNumber,
  checkPhoneNotExists,
  getUserList,
} from "@lib/user/api/service";
import { UserRole } from "@prisma/client";
import { getPhoneCodeByCountry } from "@util/countrycode";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.user) throw AppError.Unauthorized();
  if (req.user.role !== UserRole.ADMIN) throw AppError.Forbidden();
  if (!req.body.userId || !req.body.countryCode || !req.body.phoneNumber)
    throw AppError.BadRequest();
  const fullPhone =
    getPhoneCodeByCountry(req.body.countryCode) + req.body.phoneNumber;
  const isPhoneNotExist = await checkPhoneNotExists(fullPhone);
  if (!isPhoneNotExist) throw AppError.BadRequest("Phone number already exist");
  res.sendSuccess(
    await changePhoneNumber({
      userId: req.body.userId as string,
      phoneNumber: fullPhone,
    })
  );
});

export default handler;
