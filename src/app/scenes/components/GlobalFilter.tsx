import * as React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import type { Launch } from "@/app/data/types";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material-next/Chip";

interface GlobalFilterProps {
  launches: Launch[];
  setLaunches: (value: Launch[]) => void;
}

export const GlobalFilter = ({
  launches = [],
  setLaunches,
}: GlobalFilterProps) => {
  const [filters, setFilters] = React.useState<string[]>([]);

  // Add keys and labels to this list to add more filtering options
  const filterKeyList = [
    {
      key: "rocket_name",
      label: "Rocket",
    },
  ];

  React.useEffect(() => {
    // TODO: filter based off filterKeyList rather than hardcoded `launch.rocket_name`
    const filteredLaunches = launches.filter((launch) =>
      filters.includes(launch.rocket_name)
    );
    setLaunches(filteredLaunches);
  }, [filters]);

  const handleChange = (event: SelectChangeEvent) => {
    setFilters(Array.from(new Set([...filters, event.target.value])));
  };

  const handleDelete = (filterToDelete: string) => () => {
    setFilters(filters.filter((word) => word !== filterToDelete));
  };

  // Takes in a keyof Launch which we use to return an array of unique values of that key to use
  // in the filter select as options
  const filterUnique = (key: keyof Launch) => {
    return Array.from(new Set(launches.map((launch) => launch[key])));
  };

  return (
    <Stack direction="row">
      <FormControl sx={{ minWidth: 25, maxWidth: 25 }} variant="standard">
        <Select
          native
          value=""
          id="grouped-native-select"
          label="Grouping"
          IconComponent={FilterListIcon}
          onChange={handleChange}
        >
          <option aria-label="None" value="" />
          {filterKeyList.map((keyList, index) => {
            return (
              <optgroup key={index} label={keyList.label}>
                {filterUnique(keyList.key as keyof Launch).map(
                  (rocket, index) => {
                    return (
                      <option key={index} value={rocket}>
                        {rocket}
                      </option>
                    );
                  }
                )}
              </optgroup>
            );
          })}
        </Select>
      </FormControl>
      <Stack
        direction="row"
        spacing={1}
        sx={{ ml: 2, display: "flex", alignItems: "flex-end" }}
      >
        {filters.map((filter, index) => {
          return (
            <Chip
              key={index}
              onDelete={handleDelete(filter)}
              label={filter}
              color="primary"
              size="small"
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
