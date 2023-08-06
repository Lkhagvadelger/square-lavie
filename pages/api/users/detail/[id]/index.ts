import { getCurrentDate } from "@api/currentDate";
import { createHandler } from "@api/handler";
// import { subject } from "@casl/ability";
import { getUserById } from "@lib/user/api/service";
import { UserRole } from "@prisma/client";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
  // Whats the difference between this and how we handle patient cases?
  // if (req.ability.can("read", subject("User", {}))) {
  //   const users = await getUsers();
  //   res.sendSuccess(users);
  // } else {
  //   res.sendError(403, "You don't have permission to read users");
  // }
  try {
    if (!req.user) throw AppError.Unauthorized();
    if (req.user.role != UserRole.ADMIN) throw AppError.Forbidden();

    const user = await getUserById(req.query.id as string);
    res.sendSuccess(user ? { currentDate: getCurrentDate(), ...user } : null);
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
