import { createHandler } from "@api/handler";

const handler = createHandler();

handler
  .get((req, res) => {
    try {
      req.logout(() => {});
      res.sendSuccess({});
    } catch (e) {
      res.sendError(e);
    }
  })
  .delete((req, res) => {
    try {
      req.logout(() => {});
      res.sendSuccess({ success: true });
    } catch (e) {
      res.sendError(e);
    }
  });

export default handler;
