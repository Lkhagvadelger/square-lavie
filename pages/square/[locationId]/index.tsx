import { Home } from "@lib/square/ui/home";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
