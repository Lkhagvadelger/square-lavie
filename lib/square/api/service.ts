import { TeamApi, TeamMember } from "square";

const dateHelpers = require("../util/date-helpers");

const locationId = process.env.SQUARE_LOCATION_ID || "locationId";

import { bookingsApi, catalogApi, teamApi } from "@lib/square/api/squareClient";
// the path param for staffId when user is searching for all staff member availability
const ANY_STAFF_PARAMS = "anyStaffMember";

/**
 * Retrieve all the staff that can perform a specific service variation.
 * 1. Get the service using catalog API.
 * 2. Get the booking profiles for all staff members in the current location (that are bookable).
 * 3. Get all active team members for the location.
 * 4. Cross reference 1, 2, and 3 so we can find all available staff members for the service.
 * @param {String} serviceId
 * @return {[CatalogItem, String[]]} array where first item is the service item and
 * second item is the array of all the team member ids that can be booked for the service
 */
export const searchActiveTeamMembers = async (serviceId: string) => {
  // Send request to get the service associated with the given item variation ID.
  const retrieveServicePromise = catalogApi.retrieveCatalogObject(
    serviceId,
    true
  );

  // Send request to list staff booking profiles for the current location.
  const listBookingProfilesPromise = bookingsApi.listTeamMemberBookingProfiles(
    true,
    undefined,
    undefined,
    locationId
  );

  // Send request to list all active team members for this merchant at this location.
  const listActiveTeamMembersPromise = teamApi.searchTeamMembers({
    query: {
      filter: {
        locationIds: [locationId],
        status: "ACTIVE",
      },
    },
  });

  const [
    { result: services },
    {
      result: { teamMemberBookingProfiles },
    },
    {
      result: { teamMembers },
    },
  ] = await Promise.all([
    retrieveServicePromise,
    listBookingProfilesPromise,
    listActiveTeamMembersPromise,
  ]);
  // We want to filter teamMemberBookingProfiles by checking that the teamMemberId associated with the profile is in our serviceTeamMembers.
  // We also want to verify that each team member is ACTIVE.
  const serviceVariation = services.object;

  const serviceTeamMembers =
    serviceVariation?.itemVariationData?.teamMemberIds || [];
  const activeTeamMembers = teamMembers?.map(
    (teamMember: TeamMember) => teamMember.id
  );

  const bookableStaff = teamMemberBookingProfiles?.filter(
    (profile) =>
      profile.teamMemberId &&
      serviceTeamMembers?.includes(profile.teamMemberId) &&
      activeTeamMembers?.includes(profile?.teamMemberId)
  );
  return [services as any, bookableStaff?.map((staff) => staff.teamMemberId)];
};
