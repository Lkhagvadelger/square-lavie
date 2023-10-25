import { gql, request } from "graphql-request";

const endpoint = "https://connect.squareup.com/public/graphql"; // Your GraphQL API endpoint
const apiKey = process.env.SQUARE_ACCESS_TOKEN; // Replace with your API key

const query = gql`
  {
    query
    MerchantsQuery {
      orders(
        first: 10
        filter: {
          location: { equalToAnyOf: ["LS1VH64H9SA5C"] }
          merchantId: { equalToAnyOf: ["MLZT3HEMJC889"] }
        }
      ) {
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
        nodes {
          id
          totalMoney {
            currency
          }
          netAmountDue {
            currency
          }
          refunds {
            id
          }
        }
      }
    }
  }
`;

const headers = {
  Authorization: `Bearer ${apiKey}`,
};

const data = await request(endpoint, query, {}, headers);

console.log(data);
