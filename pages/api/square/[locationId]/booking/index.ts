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
      (r) => r.teamMemberId
    );
    const serviceIds = booking.appointmentSegments!.map(
      (r) => r.serviceVariationId!
    );
    const catalogyRequest: BatchRetrieveCatalogObjectsRequest = {
      objectIds: serviceIds,
      includeRelatedObjects: true,
    };

    // Make API call to get service variation details
    const { result: services } = await catalogApi.batchRetrieveCatalogObjects(
      catalogyRequest
    );

    const serviceVariation = services.objects;
    const serviceItems = services?.relatedObjects?.filter(
      (relatedObject) => relatedObject.type === "ITEM"
    );

    let teamMembers = [];

    if (teamMemberIds != null && teamMemberIds.length > 0) {
      for (const teamMember of teamMemberIds) {
        const {
          result: { teamMemberBookingProfile },
        } = await bookingsApi.retrieveTeamMemberBookingProfile(teamMember);

        teamMembers.push(teamMemberBookingProfile);
      }
    }

    res.sendSuccess({
      booking,
      serviceVariation,
      serviceItems,
      teamMembers,
    });
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
