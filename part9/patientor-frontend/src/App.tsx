import { Box, Button, Container } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { apiBaseUrl } from "./constants";
import { setDiagnosisList, setPatientList, useStateValue } from "./state";
import { Diagnosis, Patient } from "./types";

import { Typography } from "@material-ui/core";
import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Array<Patient>>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();

    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<
          Array<Diagnosis>
        >(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosisList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
          </Box>
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients">
              <Route path=":patientId" element={<PatientPage />} />
            </Route>
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
