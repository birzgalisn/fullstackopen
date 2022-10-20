import { Typography } from "@material-ui/core";
import { Entry } from "../types";
import { assertNever } from "../utils/assertNever";

import HealthRatingBar from "./HealthRatingBar";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Typography>
          Discharge ({entry.discharge.date}): {entry.discharge.criteria}
        </Typography>
      );
    case "OccupationalHealthcare":
      return (
        <Typography>
          {entry.sickLeave && (
            <>
              On sick leave from {entry.sickLeave.startDate} to{" "}
              {entry.sickLeave.endDate}
            </>
          )}
        </Typography>
      );
    case "HealthCheck":
      return (
        <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
