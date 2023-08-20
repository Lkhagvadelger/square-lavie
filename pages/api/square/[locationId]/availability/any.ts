import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";
import {
  getEndAtDate,
  getStartAtDate,
  searchActiveTeamMembers,
} from "@lib/square/api/service";
import { bookingsApi, catalogApi } from "@lib/square/api/squareClient";
import { CartModel } from "@lib/square/data/types";
import { AppError } from "@util/errors";

const handler = createHandler();

// the path param for staffId when user is searching for all staff member availability
const ANY_STAFF_PARAMS = "anyStaffMember";

handler
  .get(async (req, res) => {
    try {
      const serviceId = req.query.serviceId as string;
      // only locationId comes from query
      const locationId = req.query.locationId as string;
      // rest of the data should come from req.body
      if (
        locationId == "" ||
        locationId == undefined ||
        locationId == "undefined"
      )
        throw AppError.BadRequest("locationId is required!");
      if (serviceId == "" || serviceId == undefined || serviceId == "undefined")
        throw AppError.BadRequest("serviceId is required");
      console.log(req.query, locationId, serviceId);

      const serviceVersion = req.query.version;
      const staffId = req.query.staffId as string;
      const startAt = getStartAtDate();
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
              endAt: getEndAtDate(startAt).toISOString(),
              startAt: startAt.toISOString(),
            },
          },
        },
      };

      // get service item - needed to display service details in left pane
      const retrieveServicePromise = await catalogApi.retrieveCatalogObject(
        serviceId,
        true
      );
      let availabilities;
      // additional data to send to template
      let additionalInfo;
      // search availability for the specific staff member if staff id is passed as a param
      if (staffId === ANY_STAFF_PARAMS) {
        const [services, teamMembers] = await searchActiveTeamMembers(
          serviceId
        );
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
        const availabilityPromise =
          bookingsApi.searchAvailability(searchRequest);
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
          serviceItem: services.relatedObjects!.filter(
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
  })
  .post(async (req, res) => {
    try {
      const serviceVariantIds = req.body.selectedVariantIds as any[];

      // only locationId comes from query
      const locationId = req.query.locationId as string;
      // rest of the data should come from req.body
      if (
        locationId == "" ||
        locationId == undefined ||
        locationId == "undefined"
      )
        throw AppError.BadRequest("locationId is required!");
      if (serviceVariantIds.length == 0 || serviceVariantIds == undefined)
        throw AppError.BadRequest("selectedVariantIds is required");

      // const serviceVersion = req.query.version;
      // const staffId = req.query.staffId as string;
      const startAt = getStartAtDate();
      console.log(
        JSON.stringify(serviceVariantIds),
        startAt,
        getEndAtDate(startAt).toISOString()
      );

      // segmentFilters: [
      //   {
      //     serviceVariationId: serviceId,
      //     teamMemberIdFilter: {},
      //   },
      // ],

      const searchRequest = {
        query: {
          filter: {
            locationId,
            segmentFilters: serviceVariantIds,
            startAtRange: {
              endAt: getEndAtDate(startAt).toISOString(),
              startAt: startAt.toISOString(),
            },
          },
        },
      };

      let availabilities;
      // search availability for the specific staff member if staff id is passed as a param
        // get availability
        const { result } = await bookingsApi.searchAvailability(searchRequest);
        availabilities = result.availabilities;

        res.sendSuccess({
        availabilities,
      });
    } catch (e) {
      res.sendError(e);
    }
  });

export default handler;
