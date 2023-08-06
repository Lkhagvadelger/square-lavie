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

import { TeamApi, TeamMember } from "square";

const dateHelpers = require("../util/date-helpers");
const express = require("express");
const router = express.Router();
require("dotenv").config();

const locationId = process.env["SQUARE_LOCATION_ID"];

const { bookingsApi, catalogApi, teamApi } = require("../util/square-client");

// the path param for staffId when user is searching for all staff member availability
const ANY_STAFF_PARAMS = "anyStaffMember";

/**
 * GET /availability/:staffId/:serviceId?version
 *
 * This endpoint is in charge of retrieving the availability for the service + team member
 * If the team member is set as anyStaffMember then we retrieve the availability for all team members
 */
router.get("/:staffId/:serviceId", async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const serviceVersion = req.query.version;
  const staffId = req.params.staffId;
  const startAt = dateHelpers.getStartAtDate();
  const searchRequest = {
    query: {
      filter: {
        locationId,
        segmentFilters: [
          {
            serviceVariationId: serviceId,
          },
        ],
        startAtRange: {
          endAt: dateHelpers.getEndAtDate(startAt).toISOString(),
          startAt: startAt.toISOString(),
        },
      },
    },
  };
  try {
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
      additionalInfo = {
        serviceItem: services.relatedObjects.filter(
          (relatedObject) => relatedObject.type === "ITEM"
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
          (relatedObject) => relatedObject.type === "ITEM"
        )[0],
        serviceVariation: services.object,
      };
    }
    // send the serviceId & serviceVersion since it's needed to book an appointment in the next step
    res.render("pages/availability", {
      availabilities,
      serviceId,
      serviceVersion,
      ...additionalInfo,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
