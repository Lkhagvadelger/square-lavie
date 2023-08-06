import { createHandler } from "@api/handler";
import { createQuestionFile } from "@lib/file/api/service";
import { QuestionFileType } from "@lib/file/data/uploadHooks";
import { AppError } from "@util/errors";

const handler = createHandler();

handler
  .post(async (req, res) => {
    try {
      if (!req.user) throw AppError.Unauthorized();
      const a = <QuestionFileType>req.body;
      a.createdBy = req.user.id;

      res.sendSuccess(await createQuestionFile(a));
    } catch (e) {
      res.sendError(e);
    }
  })
  .delete(async (req, res) => {
    try {
      if (!req.user) throw AppError.Unauthorized();
      const userId: string = req.user.id as string;
      res.sendSuccess({ success: true });
    } catch (e) {
      res.sendError(e);
    }
  })
  .get(async (req, res) => {
    try {
      if (!req.user) throw AppError.Unauthorized();
      const patientNoteId: any = req.query.patientNoteId;
      // res.sendSuccess(await getPatientNoteFiles(patientNoteId));
    } catch (e) {
      res.sendError(e);
    }
  });

export default handler;
