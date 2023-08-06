import { createHandler } from "@api/handler";
import { changePassword } from "@lib/user/api/service";
import { UserRole } from "@prisma/client";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.post(async (req, res) => {
  if (!req.user) throw AppError.Unauthorized();
  if (req.user.role !== UserRole.ADMIN) throw AppError.Forbidden();
  if (!req.body.userId || !req.body.password) throw AppError.BadRequest();

  const password = req.body.password as string;
  const userId = req.body.userId as string;
  res.sendSuccess(await changePassword({ userId, password }));
});

export default handler;
