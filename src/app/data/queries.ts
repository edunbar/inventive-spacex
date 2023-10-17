import { gql } from "@apollo/client";

export const LAUNCHES_PAST = gql`
  query Query {
    launchesPast {
      id
      details
      launch_date_utc
      mission_name
      mission_id
      launch_site {
        site_name
      }
      rocket {
        rocket_name
        rocket {
          id
        }
      }
    }
  }
`;

export const ROCKET_DETAILS = gql`
  query Rocket($rocketId: ID!) {
    rocket(id: $rocketId) {
      name
      active
      description
      success_rate_pct
    }
  }
`;
