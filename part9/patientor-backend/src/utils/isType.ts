import diagnoses from "../data/diagnoses";
import { Diagnosis, Entry, Gender, HealthCheckRating } from "../types";

export const isString = (text: unknown): text is string => {
  if (!(text as string).trim().length) {
    return false;
  }
  return typeof text === "string" || text instanceof String;
};

export const isNumber = (value: unknown): value is number => {
  return !Number.isNaN(Number(value));
};

export const isArray = (arr: unknown): arr is Array<any> => {
  return typeof arr === "object" && arr instanceof Array;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export const isDiagnosisCodes = (
  diagnosisCodes: string[]
): diagnosisCodes is Array<Diagnosis["code"]> => {
  const codes = diagnoses.map((d) => d.code);
  return diagnosisCodes.every((code) => codes.includes(code));
};

export const isType = (type: unknown): type is Entry["type"] => {
  switch (type as Entry["type"]) {
    case "Hospital":
    case "HealthCheck":
    case "OccupationalHealthcare":
      return true;
    default:
      return false;
  }
};

export const isHealthCheckRating = (value: any): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(value));
};
