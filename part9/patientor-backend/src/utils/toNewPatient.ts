import { Gender, NewPatient } from "../types";
import { isDate, isGender, isString } from "./isType";

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

export const toNewPatient = (patient: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(patient.name),
    dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
    ssn: parseSsn(patient.ssn),
    gender: parseGender(patient.gender),
    occupation: parseOccupation(patient.occupation),
  };
  return newPatient;
};
