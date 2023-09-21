import { gql } from "@apollo/client";

export const LOCATION_LIST = gql`
  query LocationList(
    $tenant: String!
    $name: String
    $status: String
    $page: Int
    $limit: Int
  ) {
    locationList(
      tenant: $tenant
      name: $name
      status: $status
      page: $page
      limit: $limit
    ) {
      pages
      resources {
        address
        #  alias
        description
        id
        #  managingOrganization
        name
        #  npi
        #  partOf
        status
        #  tag
        #  taxId
        #  telecom {
        #     rank
        #     system
        #     use
        #     value
        #   }
        #  tenant
        type
        updatedAt
      }
    }
  }
`;

export const LOCATION_READ = gql`
  query LocationRead($id: String!, $tenant: String!) {
    locationRead(tenant: $tenant, id: $id) {
      id
      resource {
        address
        # alias
        # description
        id
        #  managingOrganization
        name
        # npi
        # partOf
        status
        # tag
        # taxId
        #  telecom {
        #   rank
        #   system
        #   use
        #   value
        # }
        # tenant
        # type
        updatedAt
      }
    }
  }
`;
