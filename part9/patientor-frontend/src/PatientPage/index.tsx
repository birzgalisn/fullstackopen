import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import React from "react";

import { useParams } from "react-router-dom";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import { addEntry, updatePatient, useStateValue } from "../state";
import { Entry as EntryType, Patient } from "../types";

import AddEntryModal from "../AddEntryModal";
import Entry from "../components/Entry";
import HStack from "../components/HStack";
import VStack from "../components/VStack";

const PatientPage: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const patient = React.useMemo<Patient | undefined>(() => {
    return patients[patientId ?? -1];
  }, [patients]);

  React.useEffect(() => {
    const fetchPatientEntries = async (patientId: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && !patient?.entries) {
      void fetchPatientEntries(patient.id);
    }
  }, [patient]);

  const GenderIcon = React.useMemo(() => {
    return patient?.gender === "male"
      ? "♂️"
      : patient?.gender === "female"
      ? "♀️"
      : "⚲";
  }, [patient]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (patientId && patient) {
        const { data: newEntry } = await axios.post<EntryType>(
          `${apiBaseUrl}/patients/${patientId}/entries`,
          values
        );
        dispatch(addEntry(newEntry, patientId));
      }
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      {patient ? (
        <VStack>
          <HStack>
            <Typography variant="h6">{patient.name}</Typography>
            <Typography variant="h6">{GenderIcon}</Typography>
          </HStack>

          <Typography>SSN: {patient.ssn}</Typography>
          <Typography>Occupation: {patient.occupation}</Typography>

          <Typography variant="h6">Entries:</Typography>
          {patient.entries?.length ? (
            patient.entries.map((e) => (
              <Entry key={e.id} entry={e} allDiagnoses={diagnoses} />
            ))
          ) : (
            <Typography>No entries</Typography>
          )}

          <Button
            variant="contained"
            onClick={() => openModal()}
            style={{ width: "min-content", whiteSpace: "nowrap" }}
          >
            Add New Entry
          </Button>
        </VStack>
      ) : (
        <Typography align="center" variant="h6">
          Patient missing
        </Typography>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientPage;
