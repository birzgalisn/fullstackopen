"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHealthCheckRating = exports.isType = exports.isDiagnosisCodes = exports.isGender = exports.isDate = exports.isArray = exports.isNumber = exports.isString = void 0;
const diagnoses_1 = __importDefault(require("../data/diagnoses"));
const types_1 = require("../types");
const isString = (text) => {
    if (!text.trim().length) {
        return false;
    }
    return typeof text === "string" || text instanceof String;
};
exports.isString = isString;
const isNumber = (value) => {
    return !Number.isNaN(Number(value));
};
exports.isNumber = isNumber;
const isArray = (arr) => {
    return typeof arr === "object" && arr instanceof Array;
};
exports.isArray = isArray;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
exports.isGender = isGender;
const isDiagnosisCodes = (diagnosisCodes) => {
    const codes = diagnoses_1.default.map((d) => d.code);
    return diagnosisCodes.every((code) => codes.includes(code));
};
exports.isDiagnosisCodes = isDiagnosisCodes;
const isType = (type) => {
    switch (type) {
        case "Hospital":
        case "HealthCheck":
        case "OccupationalHealthcare":
            return true;
        default:
            return false;
    }
};
exports.isType = isType;
const isHealthCheckRating = (value) => {
    return Object.values(types_1.HealthCheckRating).includes(Number(value));
};
exports.isHealthCheckRating = isHealthCheckRating;
