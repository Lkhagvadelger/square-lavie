import { createHandler } from "@api/handler";
import {
  deletePatientNoteFileToggle,
  getPatientNoteFiles,
} from "@lib/file/api/service";
import { PatientNoteFileType } from "@lib/file/data/uploadHooks";
import { AppError } from "@util/errors";

const handler = createHandler();

handler
  .post(async (req, res) => {
    try {
      if (!req.user) throw AppError.Unauthorized();
      const a = <PatientNoteFileType>req.body;
      a.createdBy = req.user.id;
      res.sendSuccess({});
    } catch (e) {
      res.sendError(e);
    }
  })
  .delete(async (req, res) => {
    try {
      if (!req.user) throw AppError.Unauthorized();
      const userId: string = req.user.id as string;
      await deletePatientNoteFileToggle({ id: req.body.id, createdBy: userId });
      res.sendSuccess({ success: true });
    } catch (e) {
      res.sendError(e);
    }
  })
  .get(async (req, res) => {
    try {
      if (!req.user) throw AppError.Unauthorized();
      res.sendSuccess({});
    } catch (e) {
      res.sendError(e);
    }
  });

export default handler;
