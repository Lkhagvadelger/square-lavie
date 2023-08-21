import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";
import {
  getEndAtDate,
  getStartAtDate,
  searchActiveTeamMembers,
} from "@lib/square/api/service";
import {
  bookingsApi,
  catalogApi,
  locationsApi,
} from "@lib/square/api/squareClient";
import { CartModel } from "@lib/square/data/types";
import { AppError } from "@util/errors";

const handler = createHandler();

handler.get(async (req, res) => {
  try {
    // only locationId comes from query
    const locationId = req.query.locationId as string;
    const { result } = await locationsApi.retrieveLocation(locationId);
    res.sendSuccess(result.location);
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
