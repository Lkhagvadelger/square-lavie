import { AppointmentSegment } from "square";

export interface ItemVariation {
  type: string;
  id: string;
  updatedAt: string;
  version: string;
  isDeleted: boolean;
  presentAtAllLocations: boolean;
  itemVariationData: {
    itemId: string;
    name: string;
    ordinal: number;
    pricingType: string;
    priceMoney: {
      amount: string;
      currency: string;
    };
    serviceDuration: string;
    availableForBooking: boolean;
    sellable: boolean;
    stockable: boolean;
    teamMemberIds: string[];
  };
}

export type ServiceItem = {
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
export type CartModel = {
  serviceId: string;
  serviceCategoryId: string;
  variantId: string;
  teamMemberIds: string[];
  name: string;
  price: number;
  quantity: number;
};
export type RequiredServiceType = {
  isServiceSelected: boolean;
  serviceId: string;
  serviceName: string;
  answerRequiredServiceId: string;
  answerRequiredServiceAnswered: boolean;
};
export type Appointment = {
  startAt: string;
  locationId: string;
  appointmentSegments: AppointmentSegment[];
};
export type AvailabilityReqModel = {
  serviceVariationId: string;
  categoryId: string;
  teamMemberIdFilter: { any: string[] };
};
export type AvailabilityCustomModel = {
  /** The RFC 3339 timestamp specifying the beginning time of the slot available for booking. */
  startAt?: string | null;
  /** The ID of the location available for booking. */
  locationId?: string;
  /** The list of appointment segments available for booking */
  appointmentSegments?: AppointmentSegment[] | null;
};
