"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const assertNever_1 = require("./assertNever");
const isType_1 = require("./isType");
const parseDescrition = (description) => {
    if (!description || !(0, isType_1.isString)(description)) {
        throw new Error("Incorrect or missing description: " + description);
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !(0, isType_1.isString)(date) || !(0, isType_1.isDate)(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !(0, isType_1.isString)(specialist)) {
        throw new Error("Incorrect or missing specialist: " + specialist);
    }
    return specialist;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes) {
        return undefined;
    }
    else if (!(0, isType_1.isArray)(diagnosisCodes) || !(0, isType_1.isDiagnosisCodes)(diagnosisCodes)) {
        throw new Error("Incorrect or missing diagnosis codes: " + diagnosisCodes);
    }
    return diagnosisCodes;
};
const parseType = (type) => {
    if (!type || !(0, isType_1.isType)(type)) {
        throw new Error("Incorrect or missing type: " + type);
    }
    return type;
};
const parseDischarge = (discharge) => {
    if (!discharge) {
        throw new Error("Incorrect or missing discharge data");
    }
    const { date, criteria } = discharge;
    if (!date || !(0, isType_1.isString)(date) || !(0, isType_1.isDate)(date)) {
        throw new Error("Incorrect or missing discharge date: " + date);
    }
    else if (!criteria || !(0, isType_1.isString)(criteria)) {
        throw new Error("Incorrect or missing discharge criteria: " + criteria);
    }
    return { date, criteria };
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!(0, isType_1.isNumber)(healthCheckRating) || !(0, isType_1.isHealthCheckRating)(healthCheckRating)) {
        throw new Error("Incorrect or missing health check rating: " + healthCheckRating);
    }
    return Number(healthCheckRating);
};
const parseEmployerName = (name) => {
    if (!name || !(0, isType_1.isString)(name)) {
        throw new Error("Incorrect or missing employer name: " + name);
    }
    return name;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave) {
        return undefined;
    }
    const { startDate, endDate } = sickLeave;
    if (!startDate && !endDate) {
        return undefined;
    }
    else if (!startDate || !(0, isType_1.isString)(startDate) || !(0, isType_1.isDate)(startDate)) {
        throw new Error("Incorrect or missing sick leave start date: " + startDate);
    }
    else if (!endDate || !(0, isType_1.isString)(endDate) || !(0, isType_1.isDate)(endDate)) {
        throw new Error("Incorrect or missing sick leave end date: " + endDate);
    }
    return { startDate, endDate };
};
const toNewPatientEntry = (entry) => {
    const base = {
        description: parseDescrition(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        diagnosisCodes: parseDiagnosisCodes(entry === null || entry === void 0 ? void 0 : entry.diagnosisCodes),
    };
    const type = parseType(entry.type);
    switch (type) {
        case "Hospital":
            return Object.assign(Object.assign({}, base), { type, discharge: parseDischarge(entry.discharge) });
        case "HealthCheck":
            return Object.assign(Object.assign({}, base), { type, healthCheckRating: parseHealthCheckRating(entry.healthCheckRating) });
        case "OccupationalHealthcare":
            return Object.assign(Object.assign({}, base), { type, employerName: parseEmployerName(entry.employerName), sickLeave: parseSickLeave(entry === null || entry === void 0 ? void 0 : entry.sickLeave) });
        default:
            return (0, assertNever_1.assertNever)(type);
    }
};
exports.toNewPatientEntry = toNewPatientEntry;
