import { createHandler } from "@api/handler";
import { getUploadKey } from "@lib/file/api/service";
import { convertMsToMins, getCustomerID } from "@lib/square/api/service";
import { bookingsApi, catalogApi } from "@lib/square/api/squareClient";
import { ApiResponse, AppointmentSegment, CreateBookingResponse } from "square";
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
    const appointmentSegmentSecond = req.body
      .appointmentSegmentSecond as AppointmentSegment[];
    const isSecondBookingRequired = req.body.isSecondBookingRequired as boolean;

    const appointment = {
      appointmentSegment,
      appointmentSegmentFirst:
        appointmentSegmentSecond &&
        appointmentSegment.filter(
          (r) =>
            !appointmentSegmentSecond
              .map((r) => r.teamMemberId)
              .includes(r.teamMemberId)
        ),
      appointmentSegmentSecond: appointmentSegmentSecond,
    };
    console.log(appointment);
    console.log("isSecondBookingRequired: ", isSecondBookingRequired);
    const startAt = req.body.startAt as string;
    const locationId = req.query.locationId as string;

    const customerNote = "customer note"; //req.body.customerNote;
    const emailAddress = "g.lkhagvadelger+2@gmail.com";
    const familyName = "Is Family name required"; //req.body.familyName;
    const givenName = "is given name is firstName + lastName"; //req.body.givenName;
    const customerId = await getCustomerID(givenName, familyName, emailAddress);
    // Create booking request
    const bookingRequestList: Promise<ApiResponse<CreateBookingResponse>>[] = [
      bookingsApi.createBooking({
        booking: {
          appointmentSegments:
            isSecondBookingRequired == false
              ? appointment.appointmentSegment
              : appointment.appointmentSegmentFirst,
          customerId,
          customerNote,
          locationId,
          startAt,
          sellerNote: isSecondBookingRequired
            ? "Your booking part 1"
            : undefined,
        },
        idempotencyKey: uuidv4(),
      }),
    ];
    if (isSecondBookingRequired) {
      bookingRequestList.push(
        bookingsApi.createBooking({
          booking: {
            appointmentSegments: appointment.appointmentSegmentSecond,
            customerId,
            customerNote,
            locationId,
            startAt,
            sellerNote: "Your booking part 2",
          },
          idempotencyKey: uuidv4(),
        })
      );
    }
    const executedResult = await Promise.all(bookingRequestList);
    const returnResult = [{ bookingId: executedResult[0].result.booking?.id }];
    executedResult[1]?.result.booking?.id &&
      returnResult.push({ bookingId: executedResult[1]?.result.booking?.id });
    res.sendSuccess(returnResult);
  } catch (e) {
    res.sendError(e);
  }
});

export default handler;
