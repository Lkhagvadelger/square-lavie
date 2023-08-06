import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";
import { searchActiveTeamMembers } from "@lib/square/api/service";
import { AppError } from "@util/errors";

const handler = createHandler();

const dateHelpers = require("../util/date-helpers");
const locationId = process.env["SQUARE_LOCATION_ID"];
// the path param for staffId when user is searching for all staff member availability
const ANY_STAFF_PARAMS = "anyStaffMember";

handler.get(async (req, res) => {
  try {
    const serviceId = req.query.serviceId;
    if (serviceId! || serviceId == undefined)
      throw AppError.BadRequest("serviceId is required");
    const serviceVersion = req.query.version;
    const staffId = req.query.staffId;
    const startAt = dateHelpers.getStartAtDate();
    const searchRequest = {
      query: {
        filter: {
          locationId,
          segmentFilters: [
            {
              serviceVariationId: serviceId,
              teamMemberIdFilter: {},
            },
          ],
          startAtRange: {
            endAt: dateHelpers.getEndAtDate(startAt).toISOString(),
            startAt: startAt.toISOString(),
          },
        },
      },
    };

    // get service item - needed to display service details in left pane
    const retrieveServicePromise = catalogApi.retrieveCatalogObject(
      serviceId,
      true
    );
    let availabilities;
    // additional data to send to template
    let additionalInfo;
    // search availability for the specific staff member if staff id is passed as a param
    if (staffId === ANY_STAFF_PARAMS) {
      const [services, teamMembers] = await searchActiveTeamMembers(serviceId);
      searchRequest.query.filter.segmentFilters[0].teamMemberIdFilter = {
        any: teamMembers,
      };
      // get availability
      const { result } = await bookingsApi.searchAvailability(searchRequest);
      availabilities = result.availabilities;
      if (services == undefined)
        throw AppError.BadRequest("services is undefined");
      additionalInfo = {
        serviceItem: services.relatedObjects.filter(
          (relatedObject: any) => relatedObject.type === "ITEM"
        )[0],
        serviceVariation: services.object,
      };
    } else {
      searchRequest.query.filter.segmentFilters[0].teamMemberIdFilter = {
        any: [staffId],
      };
      // get availability
      const availabilityPromise = bookingsApi.searchAvailability(searchRequest);
      // get team member booking profile - needed to display team member details in left pane
      const bookingProfilePromise =
        bookingsApi.retrieveTeamMemberBookingProfile(staffId);
      const [
        { result },
        { result: services },
        {
          result: { teamMemberBookingProfile },
        },
      ] = await Promise.all([
        availabilityPromise,
        retrieveServicePromise,
        bookingProfilePromise,
      ]);
      availabilities = result.availabilities;
      additionalInfo = {
        bookingProfile: teamMemberBookingProfile,
        serviceItem: services.relatedObjects.filter(
          (relatedObject: any) => relatedObject.type === "ITEM"
        )[0],
        serviceVariation: services.object,
      };
      // send the serviceId & serviceVersion since it's needed to book an appointment in the next step
    }
    res.sendSuccess({
      availabilities,
      serviceId,
      serviceVersion,
      ...additionalInfo,
    });
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
