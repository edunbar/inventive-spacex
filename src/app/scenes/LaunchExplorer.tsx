"use client";
import * as React from "react";
import { LaunchDataTable } from "./components/LaunchDataTable";
import { LaunchCardCarousel } from "./components/LaunchCardCarousel";
import { GlobalFilter } from "./components/GlobalFilter";
import { LAUNCHES_PAST } from "../../app/data/queries";
import { useQuery } from "@apollo/client";
import type { Launch } from "@/app/data/types";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export const LaunchExplorer = () => {
  const [value, setValue] = React.useState("1");
  const [launches, setLaunches] = React.useState<Launch[]>([]);
  const [filteredLaunches, setFilteredLaunches] = React.useState<Launch[]>([]);
  const { data } = useQuery(LAUNCHES_PAST);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // Launch Data formatting
  React.useEffect(() => {
    if (data) {
      const formatedLaunches: Launch[] = data.launchesPast.map(
        (launch: any) => {
          return {
            ...launch,
            rocket_name: launch.rocket.rocket_name,
            rocket_id: launch.rocket.rocket.id,
          };
        }
      );
      setLaunches(formatedLaunches);
    }
  }, [data]);

  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Data Table" value="1" />
            <Tab label="Card View" value="2" />
          </TabList>
          <GlobalFilter launches={launches} setLaunches={setFilteredLaunches} />
        </Box>
        <TabPanel value="1">
          <LaunchDataTable
            launches={
              filteredLaunches.length !== 0 ? filteredLaunches : launches
            }
          />
        </TabPanel>
        <TabPanel value="2">
          <LaunchCardCarousel
            launches={
              filteredLaunches.length !== 0 ? filteredLaunches : launches
            }
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
