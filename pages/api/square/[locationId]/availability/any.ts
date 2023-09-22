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
import { AvailabilityReqModel, CartModel } from "@lib/square/data/types";
import { AppError } from "@util/errors";
import { offline1 } from "./offline1";

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

      const serviceVersion = req.query.version;
      const staffId = req.query.staffId as string;
      const startAt = new Date(); //getStartAtDate();
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
              endAt: getEndAtDate(startAt, 30).toISOString(),
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
      // only locationId comes from query
      const locationId = req.query.locationId as string;
      // rest of the data should come from req.body
      if (
        locationId == "" ||
        locationId == undefined ||
        locationId == "undefined"
      )
        throw AppError.BadRequest("locationId is required!");
      const serviceVariantIds2: AvailabilityReqModel[] = [];

      let serviceVariantIds = req.body
        .selectedVariantIds as AvailabilityReqModel[];

      let startDate: any = req.body.startDate;

      // return res.sendSuccess(offline1);

      //[manicure serviceId, pedicure serviceId]
      // Must get this data from Location settings
      const categoryToSeparate = [
        { categoryId: "42Q7FDU26NEHTPIAL66WRWTA", teamMemberIds: [] },
        {
          categoryId: "CDCJXC5L5ZXRLEFKABSE7PVX",
          teamMemberIds: [],
        },
      ];

      //if categoryToSeparate serviceIds both detected inside serviceVariantIds
      const isContainingBothCategory = categoryToSeparate
        .map((r) => r.categoryId)
        .every((item) =>
          serviceVariantIds.map((e) => e.categoryId).includes(item)
        );

      if (isContainingBothCategory) {
        //create second serviceVariantIds
        serviceVariantIds
          .filter((r) => r.categoryId == categoryToSeparate[1].categoryId)
          .filter((r) => r.teamMemberIdFilter.any.length > 1)
          .map((r) => {
            serviceVariantIds2.push({
              serviceVariationId: r.serviceVariationId,
              categoryId: r.categoryId,
              teamMemberIdFilter: { any: ["TMCwFyeMexqTdxw4"] },
            });
          });

        serviceVariantIds = serviceVariantIds.map((r) => {
          return {
            serviceVariationId: r.serviceVariationId,
            categoryId: r.categoryId,
            teamMemberIdFilter: {
              any: r.teamMemberIdFilter.any.filter(
                (r1) => r1 != "TMCwFyeMexqTdxw4"
              ),
            },
          };
        });
      }

      if (serviceVariantIds.length == 0 || serviceVariantIds == undefined)
        throw AppError.BadRequest("selectedVariantIds is required");

      // const serviceVersion = req.query.version;
      // const staffId = req.query.staffId as string;

      // const startAt = new Date();
      // // only allow booking start time 4 hours from now
      // startAt.setHours(startAt.getHours() + 4);

      let startAt = new Date(
        startDate.year,
        startDate.month,
        startDate.day,
        0,
        0,
        1,
        0
      );

      // const endAt = new Date();
      // // only allow booking start time 4 hours from now
      // endAt.setDate(endAt.getDate()+2)

      const endAt = new Date(
        startDate.year,
        startDate.month,
        startDate.day + 2,
        0,
        0,
        1,
        0
      );

      console.log(startAt, "Start AT");
      console.log(endAt, "End At");

      const searchRequest: any[] = [
        {
          query: {
            filter: {
              locationId,
              segmentFilters: serviceVariantIds,
              startAtRange: {
                endAt: endAt.toISOString(),
                startAt: startAt.toISOString(),
              },
            },
          },
        },
        {
          query: {
            filter: {
              locationId,
              segmentFilters: serviceVariantIds2,
              startAtRange: {
                endAt: endAt.toISOString(),
                startAt: startAt.toISOString(),
              },
            },
          },
        },
      ];

      let availabilities = (
        await bookingsApi.searchAvailability(searchRequest[0])
      ).result.availabilities;

      // search availability for the specific staff member if staff id is passed as a param
      // get availability

      if (serviceVariantIds2.length > 0) {
        return res.sendSuccess({
          startDate,
          availabilities,
          availabilities2: (
            await bookingsApi.searchAvailability(searchRequest[1])
          ).result.availabilities,
        });
      }
      return res.sendSuccess({
        startDate,
        availabilities,
        availabilities2: null,
      });
    } catch (e) {
      res.sendError(e);
    }
  });

export default handler;
