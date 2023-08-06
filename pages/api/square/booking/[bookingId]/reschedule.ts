import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";
import { getEndAtDate, getStartAtDate } from "@lib/square/api/service";
import { bookingsApi } from "@lib/square/api/squareClient";
import { AppError } from "@util/errors";
const locationId = process.env["SQUARE_LOCATION_ID"];
const handler = createHandler();
/**
 * GET /booking/:bookingId/reschedule
 *
 * Get availability for the service variation & team member of the
 * existing booking so the user can reschedule the booking
 */
handler
  .get(async (req, res) => {
    const bookingId = req.query.bookingId as string;
    if (bookingId === undefined)
      throw AppError.BadRequest("bookingId is required");
    try {
      // Retrieve the booking provided by the bookingId.
      const {
        result: { booking },
      } = await bookingsApi.retrieveBooking(bookingId);

      const { serviceVariationId, teamMemberId, serviceVariationVersion } =
        booking!.appointmentSegments![0];
      const startAt = getStartAtDate();
      const searchRequest: any = {
        query: {
          filter: {
            locationId,
            segmentFilters: [
              {
                serviceVariationId,
                teamMemberIdFilter: {
                  any: [teamMemberId],
                },
              },
            ],
            startAtRange: {
              endAt: getEndAtDate(startAt).toISOString(),
              startAt: startAt.toISOString(),
            },
          },
        },
      };
      // get availability
      const {
        result: { availabilities },
      } = await bookingsApi.searchAvailability(searchRequest);
      res.sendSuccess({
        availabilities,
        bookingId,
        serviceId: serviceVariationId,
        serviceVersion: serviceVariationVersion,
      });
    } catch (e) {
      res.sendError(e);
    }
  })
  /**
   * POST /booking/:bookingId/reschedule
   *
   * Update an existing booking, you may update the starting date
   */
  .post(async (req, res) => {
    const bookingId = req.query.bookingId as string;
    const startAt = req.query.startAt as string;

    try {
      const {
        result: { booking },
      } = await bookingsApi.retrieveBooking(bookingId);
      const updateBooking = {
        startAt,
        version: booking!.version,
      };

      const {
        result: { booking: newBooking },
      } = await bookingsApi.updateBooking(bookingId, {
        booking: updateBooking,
      });

      res.sendSuccess({ bookingId: newBooking!.id });
    } catch (e) {
      res.sendError(e);
    }
  });

export default handler;
