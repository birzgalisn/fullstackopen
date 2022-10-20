import {
  BaseEntry,
  BaseEntryWithoutId,
  Discharge,
  Entry,
  EntryWithoutId,
  SickLeave,
} from "../types";
import { assertNever } from "./assertNever";
import {
  isArray,
  isDate,
  isDiagnosisCodes,
  isHealthCheckRating,
  isNumber,
  isString,
  isType,
} from "./isType";

const parseDescrition = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing description: " + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing specialist: " + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): BaseEntry["diagnosisCodes"] => {
  if (!diagnosisCodes) {
    return undefined;
  } else if (!isArray(diagnosisCodes) || !isDiagnosisCodes(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnosis codes: " + diagnosisCodes);
  }
  return diagnosisCodes;
};

const parseType = (type: unknown): string => {
  if (!type || !isType(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge) {
    throw new Error("Incorrect or missing discharge data");
  }
  const { date, criteria } = discharge as Discharge;
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing discharge date: " + date);
  } else if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria: " + criteria);
  }
  return { date, criteria };
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing health check rating: " + healthCheckRating
    );
  }
  return Number(healthCheckRating);
};

const parseEmployerName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing employer name: " + name);
  }
  return name;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  const { startDate, endDate } = sickLeave as SickLeave;
  if (!startDate && !endDate) {
    return undefined;
  } else if (!startDate || !isString(startDate) || !isDate(startDate)) {
    throw new Error("Incorrect or missing sick leave start date: " + startDate);
  } else if (!endDate || !isString(endDate) || !isDate(endDate)) {
    throw new Error("Incorrect or missing sick leave end date: " + endDate);
  }
  return { startDate, endDate };
};

export const toNewPatientEntry = (entry: any): EntryWithoutId => {
  const base: BaseEntryWithoutId = {
    description: parseDescrition(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: parseDiagnosisCodes(entry?.diagnosisCodes),
  };

  const type = parseType(entry.type) as Entry["type"];

  switch (type) {
    case "Hospital":
      return {
        ...base,
        type,
        discharge: parseDischarge(entry.discharge),
      };
    case "HealthCheck":
      return {
        ...base,
        type,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
      };
    case "OccupationalHealthcare":
      return {
        ...base,
        type,
        employerName: parseEmployerName(entry.employerName),
        sickLeave: parseSickLeave(entry?.sickLeave),
      };
    default:
      return assertNever(type);
  }
};
