import { Completed } from "@lib/square/ui/Booking/Completed";
import { useRouter } from "next/router";

export const SquareDatePage = () => {
  const router = useRouter();
  const locationId = router.query.locationId as string;
  const bookingId = router.query.bookingId as string;

  // must check is location id exists in square api
  return locationId ? (
    <Completed locationId={locationId} bookingId={bookingId} />
  ) : (
    <>No Booking id provided</>
  );
};
export default SquareDatePage;
