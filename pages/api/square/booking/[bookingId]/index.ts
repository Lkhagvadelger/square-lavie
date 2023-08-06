import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";

const handler = createHandler();
/**
 * GET /booking/:bookingId
 *
 * This endpoint is in charge of aggregating data for the given booking id in order to render a booking confirmation page.
 * It will do the following steps:
 * 1. Get the booking associated with the given bookingID
 * 2. Get information about the team member, location, service, etc, based on the information from 1.
 */
handler.get(async (req, res) => {
  const bookingId = req.query.bookingId;
  try {
    // Retrieve the booking provided by the bookingId.
    const {
      result: { booking },
    } = await bookingsApi.retrieveBooking(bookingId);

    const serviceVariationId =
      booking.appointmentSegments[0].serviceVariationId;
    const teamMemberId = booking.appointmentSegments[0].teamMemberId;

    // Make API call to get service variation details
    const retrieveServiceVariationPromise = catalogApi.retrieveCatalogObject(
      serviceVariationId,
      true
    );

    // Make API call to get team member details
    const retrieveTeamMemberPromise =
      bookingsApi.retrieveTeamMemberBookingProfile(teamMemberId);

    // Wait until all API calls have completed
    const [
      { result: service },
      {
        result: { teamMemberBookingProfile },
      },
    ] = await Promise.all([
      retrieveServiceVariationPromise,
      retrieveTeamMemberPromise,
    ]);

    const serviceVariation = service.object;
    const serviceItem = service.relatedObjects.filter(
      (relatedObject: any) => relatedObject.type === "ITEM"
    )[0];

    res.sendSuccess({
      booking,
      serviceItem,
      serviceVariation,
      teamMemberBookingProfile,
    });
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
