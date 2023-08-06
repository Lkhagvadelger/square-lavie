import { createHandler } from "@api/handler";
import { getFileById } from "@lib/file/api/service";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const fileLink = await getFileById(req.query.id as string);
    fileLink?.fileLink;
    if (fileLink) {
      //send request to AWS
    }
    res.sendSuccess();
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
