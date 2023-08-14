import { useState } from "react";
import { useGetServices } from "../data/hooks";
import { ItemVariation } from "../data/types";
import { useRouter } from "next/router";
import { AppLayout, Box, Text } from "@ui/index";
import { groupBy } from "lodash";
export const Home = ({ locationId }: { locationId: string }) => {
  const { data, isLoading } = useGetServices();

  return (
    <AppLayout>
      <Box>
        {/* Total list of service Item */}
        {/* Group by itemDatacategoryId */}

        {data?.map((service: ServiceItem, key: number) => {
          return (
            <Box key={key}>
              <Text>{service.itemData.name}</Text>
            </Box>
          );
        })}
      </Box>
    </AppLayout>
  );
};
type ServiceItem = {
  type: string;
  id: string;
  updatedAt: string;
  version: string;
  isDeleted: boolean;
  presentAtAllLocations: boolean;
  itemData: {
    name: string;
    abbreviation: string;
    labelColor: string;
    categoryId: string;
    taxIds: string[];
    variations: ItemVariation[];
    productType: string;
    skipModifierScreen: boolean;
  };
};
