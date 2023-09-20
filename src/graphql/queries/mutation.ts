import { gql } from "@apollo/client";

export const LOCATION_CREATE = gql`
  mutation LocationCreate($requestBody: LocationWriteInput!, $tenant: String!) {
    locationCreate(requestBody: $requestBody, tenant: $tenant) {
      ... on LocationCommandResponse {
        resourceID
      }
      ... on Error {
        error
        message
        statusCode
      }
    }
  }
`;
