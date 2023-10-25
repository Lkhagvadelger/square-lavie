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

import {
  Client,
  Environment,
  CustomersApi,
  BookingsApi,
  CatalogApi,
  LocationsApi,
  TeamApi,
  OrdersApi,
  PaymentsApi,
  CustomerGroupsApi,
  CustomerSegmentsApi,
} from "square";

const accessToken = process.env.SQUARE_ACCESS_TOKEN;

// Set Square credentials
const config = {
  accessToken,
  environment: Environment.Production,
  // process.env.NODE_ENV == "development"
  //   ? Environment.Sandbox
  //   : process.env.NODE_ENV == "production"
  //   ? Environment.Production
  //   : Environment.Custom,
  // userAgentDetail: "sample_app_node_bookings", // Remove or replace this detail when building your own app
};

console.log(config);
const client = new Client(config);
// const { customersApi, bookingsApi, catalogApi, locationsApi, teamApi } = client;

// // Extract instances of Api that are used
// // You can add additional APIs here if you so choose
const {
  customersApi,
  bookingsApi,
  catalogApi,
  ordersApi,
  locationsApi,
  customerGroupsApi,
  customerSegmentsApi,
  teamApi,
  paymentsApi,
}: {
  customersApi: CustomersApi;
  bookingsApi: BookingsApi;
  catalogApi: CatalogApi;
  locationsApi: LocationsApi;
  teamApi: TeamApi;
  ordersApi: OrdersApi;
  paymentsApi: PaymentsApi;
  customerGroupsApi: CustomerGroupsApi;
  customerSegmentsApi: CustomerSegmentsApi;
} = client;
export {
  bookingsApi,
  catalogApi,
  customersApi,
  locationsApi,
  customerSegmentsApi,
  teamApi,
  ordersApi,
  customerGroupsApi,
  paymentsApi,
};
