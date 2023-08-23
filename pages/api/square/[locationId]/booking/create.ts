import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";
import { convertMsToMins, getCustomerID } from "@lib/square/api/service";
import { bookingsApi, catalogApi } from "@lib/square/api/squareClient";
import { AppointmentSegment } from "square";
const { v4: uuidv4 } = require("uuid");

const handler = createHandler();
const locationId = process.env["SQUARE_LOCATION_ID"];
/**
 * POST /booking/create
 *
 * Create a new booking, booking details and customer information is submitted
 * by form data. Create a new customer if necessary, otherwise use an existing
 * customer that matches the `firstName`, `lastName` and `emailAddress`
 * to create the booking.
 *
 * accepted query params are:
 * `serviceId` - the ID of the service
 * `staffId` - the ID of the staff
 * `startAt` - starting time of the booking
 * `serviceVariationVersion` - the version of the service initially selected
 */
handler.post(async (req, res) => {
  try {
    const appointmentSegment = req.body
      .appointmentSegments as AppointmentSegment[];
    const startAt = req.body.startAt as string;
    const locationId = req.query.locationId as string;

    const customerNote = "customer note"; //req.body.customerNote;
    const emailAddress = "g.lkhagvadelger+2@gmail.com";
    req.body.emailAddress;
    const familyName = "Is Family name required"; //req.body.familyName;
    const givenName = "is given name is firstName + lastName"; //req.body.givenName;

    // Create booking
    const {
      result: { booking },
    } = await bookingsApi.createBooking({
      booking: {
        appointmentSegments: appointmentSegment,
        customerId: await getCustomerID(givenName, familyName, emailAddress),
        customerNote,
        locationId,
        startAt,
      },
      idempotencyKey: uuidv4(),
    });

    res.sendSuccess({ bookingId: booking!.id });
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
