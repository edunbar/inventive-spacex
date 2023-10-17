import * as React from "react";
import type { Launch } from "@/app/data/types";
import { DetailedLaunchData } from "./DetailedLaunchModal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface LaunchCardProps {
  launch: Launch;
}

export const LaunchCard = ({ launch }: LaunchCardProps) => {
  const [open, setOpen] = React.useState(false);
  const [metadata, setMetadata] = React.useState({});

  const handleClick = (metadata: Partial<Launch>) => {
    setOpen(true);
    setMetadata(metadata);
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        minHeight: 350,
        maxHeight: 350,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Mission Name
        </Typography>
        <Typography variant="h5" component="div">
          {launch.mission_name}
        </Typography>
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Rocket
        </Typography>
        <Typography variant="body2">{launch.rocket_name}</Typography>
        <Typography sx={{ mt: 2 }} color="text.secondary">
          Launch Date
        </Typography>
        <Typography variant="body2">
          {new Date(launch.launch_date_utc).toUTCString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() =>
            handleClick({
              mission_name: launch.mission_name,
              details: launch.details,
              launchpad: launch.launchpad,
              rocket_name: launch.rocket_name,
              rocket_id: launch.rocket_id,
              launch_date_utc: launch.launch_date_utc,
            })
          }
        >
          Details
        </Button>
      </CardActions>
      <DetailedLaunchData open={open} setOpen={setOpen} metadata={metadata} />
    </Card>
  );
};
