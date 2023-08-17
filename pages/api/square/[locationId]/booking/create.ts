import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";
import { convertMsToMins, getCustomerID } from "@lib/square/api/service";
import { bookingsApi, catalogApi } from "@lib/square/api/squareClient";
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
    const serviceId = req.query.serviceId as string;
    const serviceVariationVersion = req.query.version as any;
    const staffId = req.query.staffId as string;
    const startAt = req.query.startAt as string;

    const customerNote = req.body.customerNote;
    const emailAddress = req.body.emailAddress;
    const familyName = req.body.familyName;
    const givenName = req.body.givenName;

    // Retrieve catalog object by the variation ID
    const {
      result: { object: catalogItemVariation },
    } = await catalogApi.retrieveCatalogObject(serviceId);
    const durationMinutes = convertMsToMins(
      catalogItemVariation!.itemVariationData!.serviceDuration
    );

    // Create booking
    const {
      result: { booking },
    } = await bookingsApi.createBooking({
      booking: {
        appointmentSegments: [
          {
            durationMinutes,
            serviceVariationId: serviceId,
            serviceVariationVersion,
            teamMemberId: staffId,
          },
        ],
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
