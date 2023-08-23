import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";
import { bookingsApi, catalogApi } from "@lib/square/api/squareClient";
import { BatchRetrieveCatalogObjectsRequest, Booking } from "square";

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
  const bookingId = req.query.bookingId as string;
  try {
    // Retrieve the booking provided by the bookingId.
    const {
      result: { booking },
    } = await bookingsApi.retrieveBooking(bookingId);
    if (!booking) throw new Error("Booking not found");
    const teamMemberIds = booking.appointmentSegments?.map(
      (segment) => segment.teamMemberId
    );
    const serviceIds = booking.appointmentSegments!.map(
      (r) => r.serviceVariationId!
    );
    const catalogyRequest: BatchRetrieveCatalogObjectsRequest = {
      objectIds: serviceIds,
      includeRelatedObjects: true,
    };
    // Make API call to get service variation details
    const retrieveServiceVariationPromise =
      catalogApi.batchRetrieveCatalogObjects(catalogyRequest);

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
