import { createHandler } from "@api/handler";
import {
  changeEmail,
  changePassword,
  checkEmailNotExists,
} from "@lib/user/api/service";
import { validateEmail } from "@lib/user/data/validators";
import { UserRole } from "@prisma/client";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.user) throw AppError.Unauthorized();
  if (req.user.role !== UserRole.ADMIN) throw AppError.Forbidden();
  if (!req.body.userId || !req.body.email) throw AppError.BadRequest();

  const email = req.body.email as string;
  const userId = req.body.userId as string;

  if (!validateEmail(email))
    throw AppError.BadRequest("validation.email.invalid");

  const isEmailNotExist = await checkEmailNotExists(email);
  if (!isEmailNotExist) throw AppError.BadRequest("validation.email.duplicate");

  res.sendSuccess(await changeEmail({ userId, email }));
});

export default handler;
