import React from "react";
import { Diagnosis, Entry as EntryType } from "../types";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import WorkIcon from "@material-ui/icons/Work";
import EntryDetails from "./EntryDetails";
import HStack from "./HStack";
import Italic from "./Italic";
import StyledBox from "./StyledBox";

const Entry: React.FC<{
  entry: EntryType;
  allDiagnoses: { [id: string]: Diagnosis };
}> = ({ entry, allDiagnoses }) => {
  const dense = { padding: 0, margin: 0 };

  return (
    <StyledBox>
      <HStack>
        <Typography>{entry.date}</Typography>
        {entry.type === "OccupationalHealthcare" ? (
          <>
            <WorkIcon />
            <Italic>{entry.employerName}</Italic>
          </>
        ) : (
          <LocalHospitalIcon />
        )}
      </HStack>
      <Italic>{entry.description}</Italic>

      {entry.diagnosisCodes && !!entry.diagnosisCodes.length && (
        <>
          <Typography>Diagnoses:</Typography>
          <List style={dense}>
            {entry.diagnosisCodes?.map((c) => (
              <ListItem key={c} style={dense}>
                <ListItemIcon style={{ minWidth: "10px" }}>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText>
                  {c} {allDiagnoses[c].name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </>
      )}

      <EntryDetails entry={entry} />

      <Typography>Diagnose by {entry.specialist}</Typography>
    </StyledBox>
  );
};

export default Entry;
