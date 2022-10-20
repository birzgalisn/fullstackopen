"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const isType_1 = require("./isType");
const parseName = (name) => {
    if (!name || !(0, isType_1.isString)(name)) {
        throw new Error("Incorrect or missing name: " + name);
    }
    return name;
};
const parseDateOfBirth = (date) => {
    if (!date || !(0, isType_1.isString)(date) || !(0, isType_1.isDate)(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !(0, isType_1.isString)(ssn)) {
        throw new Error("Incorrect or missing ssn: " + ssn);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !(0, isType_1.isString)(gender) || !(0, isType_1.isGender)(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !(0, isType_1.isString)(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation);
    }
    return occupation;
};
const toNewPatient = (patient) => {
    const newPatient = {
        name: parseName(patient.name),
        dateOfBirth: parseDateOfBirth(patient.dateOfBirth),
        ssn: parseSsn(patient.ssn),
        gender: parseGender(patient.gender),
        occupation: parseOccupation(patient.occupation),
    };
    return newPatient;
};
exports.toNewPatient = toNewPatient;
