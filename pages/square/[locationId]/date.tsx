import { DatePage } from "@lib/square/ui/DatePage";
import { useRouter } from "next/router";

export const SquareDatePage = () => {
  const router = useRouter();
  const locationId = router.query.locationId as string;
  // must check is location id exists in square api
  return locationId ? (
    <DatePage locationId={locationId} />
  ) : (
    <>No location id provided</>
  );
};
export default SquareDatePage;
