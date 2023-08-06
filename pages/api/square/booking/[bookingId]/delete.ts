import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";

const handler = createHandler();
/**
 * POST /booking/:bookingId/delete
 *
 * delete a booking by booking ID
 */
handler.post(async (req, res) => {
  try {
    const bookingId = req.query.bookingId;

    const {
      result: { booking },
    } = await bookingsApi.retrieveBooking(bookingId);
    await bookingsApi.cancelBooking(bookingId, {
      bookingVersion: booking.version,
    });

    res.sendSuccess({ cancel: "success" });
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
