import { describe, expect, test } from "@jest/globals";
import { ordersApi, paymentsApi } from "./squareClient";
import { Payment } from "square";
describe("Monthly revenue", () => {
  test("Should retrieve total income in month", async () => {
    var response = await paymentsApi.listPayments(
      "2023-09-01T16:00:00.000Z",
      "2023-11-30T16:00:00.000Z",
      "desc",
      undefined,
      process.env.SQUARE_LOCATION_ID,
      undefined,
      undefined,
      undefined,
      100
    );

    expect(response.result.payments).not.toBeNull();
  });
});
