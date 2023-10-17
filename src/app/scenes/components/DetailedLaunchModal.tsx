"use client";
import * as React from "react";
import type { Launch, Rocket } from "@/app/data/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useQuery } from "@apollo/client";
import { ROCKET_DETAILS } from "@/app/data/queries";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DetailedLaunchDataProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  metadata: Partial<Launch>;
}

export const DetailedLaunchData = ({
  open,
  setOpen,
  metadata,
}: DetailedLaunchDataProps) => {
  const [rocketData, setRocketData] = React.useState<Rocket>();
  const { data } = useQuery(ROCKET_DETAILS, {
    variables: { rocketId: metadata.rocket_id },
  });

  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (data) {
      setRocketData(data.rocket);
    }
  }, [data]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-mission-title" variant="h5" component="h2">
            Mission
          </Typography>
          <Typography id="modal-mission-description" variant="subtitle1">
            {metadata.mission_name}
          </Typography>
          <Typography
            id="modal-mission-title"
            variant="h5"
            component="h2"
            sx={{ mt: 2 }}
          >
            Date
          </Typography>
          <Typography id="modal-mission-description" variant="subtitle1">
            {new Date(metadata.launch_date_utc!).toUTCString()}
          </Typography>
          <Typography id="modal-mission-title" variant="h6" sx={{ mt: 2 }}>
            Details
          </Typography>
          <Typography id="modal-modal-description" variant="subtitle1">
            {metadata.details ? metadata.details : "No Details Provided"}
          </Typography>
          <Typography id="modal-mission-title" variant="h6" sx={{ mt: 2 }}>
            Launchpad
          </Typography>
          <Typography id="modal-modal-description" variant="subtitle1">
            {metadata.launchpad ? metadata.launchpad : "No Launchpad Provided"}
          </Typography>
          <Typography id="modal-mission-title" variant="h6" sx={{ mt: 2 }}>
            Rocket
          </Typography>
          {metadata.rocket_name && rocketData ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{metadata.rocket_name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1">Description</Typography>
                <Typography variant="subtitle2">
                  {rocketData.description
                    ? rocketData.description
                    : "No Description Provided"}
                </Typography>
                <Typography variant="subtitle1" mt={2}>
                  Active
                </Typography>
                <Typography variant="subtitle2">
                  {rocketData.active.toString()}
                </Typography>
                <Typography variant="subtitle1" mt={2}>
                  Success Rate
                </Typography>
                <Typography variant="subtitle2">
                  {rocketData.success_rate_pct
                    ? rocketData.success_rate_pct
                    : "No Details Provided"}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Typography id="modal-modal-description" variant="subtitle1">
              "No Rocket Provided"
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};
