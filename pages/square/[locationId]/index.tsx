import { Home } from "@lib/square/ui/Home1";
import { useRouter } from "next/router";

export const SquareHomePage = () => {
  const router = useRouter();
  const locationId = router.query.locationId as string;
  // must check is location id exists in square api
  return locationId ? (
    <Home locationId={locationId} />
  ) : (
    <>No location id provided</>
  );
};
export default SquareHomePage;
