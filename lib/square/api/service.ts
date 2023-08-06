import { TeamApi, TeamMember } from "square";

const dateHelpers = require("../util/date-helpers");
const { v4: uuidv4 } = require("uuid");
const locationId = process.env.SQUARE_LOCATION_ID || "locationId";

import {
  bookingsApi,
  catalogApi,
  customersApi,
  teamApi,
} from "@lib/square/api/squareClient";
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

/**
 * Convert a duration in milliseconds to minutes
 *
 * @param {*} duration - duration in milliseconds
 * @returns {Number} - duration in minutes
 */
export const convertMsToMins = (duration: any) => {
  return Math.round(Number(duration) / 1000 / 60);
};

/**
 * Return the id of a customer that matches the firstName, lastName and email
 * If such customer doesn't exist, create a new customer.
 *
 * @param {string} givenName
 * @param {string} familyName
 * @param {string} emailAddress
 */
export const getCustomerID = async (
  givenName: string,
  familyName: string,
  emailAddress: string
) => {
  const {
    result: { customers },
  } = await customersApi.searchCustomers({
    query: {
      filter: {
        emailAddress: {
          exact: emailAddress,
        },
      },
    },
  });

  if (customers && customers.length > 0) {
    const matchingCustomers = customers.filter(
      (customer) =>
        customer.givenName === givenName && customer.familyName === familyName
    );

    // If a matching customer is found, return the first matching customer
    if (matchingCustomers.length > 0) {
      return matchingCustomers[0].id;
    }
  }

  // If no matching customer is found, create a new customer and return its ID
  const {
    result: { customer },
  } = await customersApi.createCustomer({
    emailAddress,
    familyName,
    givenName,
    idempotencyKey: uuidv4(),
    referenceId: "BOOKINGS-SAMPLE-APP",
  });

  return customer!.id;
};

/*
Copyright 2021 Square Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const QUERY_RANGE_PERIOD_DAYS = 30;
const MIN_BOOKING_START_TIME_HOURS = 4;

/**
 * Generate end date for search
 * @param startDate {Date}
 * @returns date
 */

export const getEndAtDate = (startDate: any) => {
  const endDate = new Date(startDate);
  // only allow booking end time 30 days from start
  endDate.setDate(endDate.getDate() + QUERY_RANGE_PERIOD_DAYS);
  return endDate;
};

/**
 * Generate start date for search
 * @returns date
 */
export const getStartAtDate = () => {
  const date = new Date();
  // only allow booking start time 4 hours from now
  date.setHours(date.getHours() + MIN_BOOKING_START_TIME_HOURS);
  return date;
};
