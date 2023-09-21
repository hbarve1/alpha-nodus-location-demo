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

export const LOCATION_REMOVE = gql`
  mutation LocationRemove($id: String!, $tenant: String!) {
    locationRemove(id: $id, tenant: $tenant) {
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

export const LOCATION_UPDATE = gql`
  mutation LocationUpdate(
    $id: String!
    $requestBody: LocationWriteInput!
    $tenant: String!
  ) {
    locationUpdate(id: $id, requestBody: $requestBody, tenant: $tenant) {
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
