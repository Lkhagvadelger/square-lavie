import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    const { fileName, fileType } = req.query;
    const result = await getUploadKey(fileName as string, fileType as string);

    res.json(result);
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
