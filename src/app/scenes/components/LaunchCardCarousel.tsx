import * as React from "react";
import Grid from "@mui/material/Grid";
import { stableSort, getComparator } from "../utils/dataTableUtils";
import type { Launch } from "@/app/data/types";
import { LaunchCard } from "./LaunchCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface LaunchCardCarouselProps {
  launches: Launch[];
}

export const LaunchCardCarousel = ({
  launches = [],
}: LaunchCardCarouselProps) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const orderedLaunches = React.useMemo(
    () => stableSort(launches, getComparator("desc", "launch_date_utc")),
    [launches]
  );

  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {orderedLaunches.slice(page - 1, page + 3).map((launch) => (
          <Grid key={launch.id} item xs={3}>
            <LaunchCard launch={launch} />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} mt={2}>
        <Pagination
          count={Math.ceil(launches!.length)}
          page={page}
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};
