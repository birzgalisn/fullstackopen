import { v4 as uuid } from "uuid";
import patients from "../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatient,
  Patient,
  PublicPatient,
} from "../types";

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<PublicPatient> => {
  return patients.map(({ ssn, entries, ...patient }) => patient);
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, entries: [], id: uuid() };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryWithoutId): Entry => {
  const patient = findById(id);
  if (!patient) {
    throw new Error("Unable to find patient");
  }
  const newEntry = { ...entry, id: uuid() };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient,
  addEntry,
};
