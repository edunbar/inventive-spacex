export type Launch = {
  launch_date_utc: string | number;
  details: string | number;
  id: string | number;
  launchpad: string | number;
  mission_name: string | number;
  mission_id: string | number;
  rocket_name: string;
  rocket_id: string | number;
};

export type Rocket = {
  name: string;
  active: boolean;
  description: string;
  success_rate_pct: number;
};
