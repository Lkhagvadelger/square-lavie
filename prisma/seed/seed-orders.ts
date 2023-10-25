import { ordersApi } from "../../lib/square/api/squareClient";
import { Prisma, PrismaClient } from "@prisma/client";
import { castBigIntToNumber } from "../../lib/core/util/cast";
import { Order, OrderLineItem } from "square";

const seedDb = async (prisma: PrismaClient, orders: Order[]) => {
  //find exisiting orders by order ids
  const existingOrders = await prisma.order.findMany({
    where: {
      id: {
        in: orders.map((order) => order.id!),
      },
    },
  });
  const newOrders = orders.filter(
    (order) =>
      !existingOrders.some((existingOrder) => existingOrder.id === order.id)
  );

  if (newOrders.length === 0) {
    console.log("No new orders to add.");
    return 0;
  }

  for (const n of newOrders) {
    const m = mapEntity(n);
    await prisma.order.create({
      data: m,
    });
  }
  return newOrders.length;
};

export const seedOrders = async (
  prisma: PrismaClient,
  locationId: string,
  orderIds: string[]
) => {
  var resp = await ordersApi.batchRetrieveOrders({
    locationId,
    orderIds,
  });
  if (resp.result.orders && resp.result.orders.length > 0) {
    //seed results to db
    // const result = await prisma.order.create({
    //   data: mapEntity(resp.result.orders[0]),
    // });
    const num = await seedDb(prisma, resp.result.orders);
    console.log(`${locationId}---${num} orders added to db`);
  }
};

const mapEntity = (order: Order): Prisma.OrderCreateInput => {
  return {
    id: order.id!,
    source: castBigIntToNumber(order.source),
    locationId: order.locationId,
    referenceId: order.referenceId,
    customerId: order.customerId,
    lineItems: {
      createMany: {
        data: castBigIntToNumber(order.lineItems) ?? [],
      },
    },
    taxes: castBigIntToNumber(order.taxes),
    discounts: castBigIntToNumber(order.discounts),
    serviceCharges: {
      createMany: { data: castBigIntToNumber(order.serviceCharges) ?? [] },
    },
    fulfillments: {
      createMany: { data: castBigIntToNumber(order.fulfillments) ?? [] },
    },
    returns: {
      createMany: { data: castBigIntToNumber(order.returns) ?? [] },
    },
    returnAmounts: castBigIntToNumber(order.returnAmounts),
    netAmounts: castBigIntToNumber(order.netAmounts),
    roundingAdjustment: castBigIntToNumber(order.roundingAdjustment),
    tenders: {
      createMany: { data: castBigIntToNumber(order.tenders) ?? [] },
    },
    refunds: {
      createMany: { data: castBigIntToNumber(order.refunds) ?? [] },
    },
    metadata: castBigIntToNumber(order.metadata),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    closedAt: order.closedAt,
    state: order.state,
    version: order.version,
    totalMoney: castBigIntToNumber(order.totalMoney),
    totalTaxMoney: castBigIntToNumber(order.totalTaxMoney),
    totalDiscountMoney: castBigIntToNumber(order.totalDiscountMoney),
    totalTipMoney: castBigIntToNumber(order.totalTipMoney),
    totalServiceChargeMoney: castBigIntToNumber(order.totalServiceChargeMoney),
    ticketName: order.ticketName,
    pricingOptions: castBigIntToNumber(order.pricingOptions),
    rewards: castBigIntToNumber(order.rewards),
    netAmountDueMoney: castBigIntToNumber(order.netAmountDueMoney),
  };
};
