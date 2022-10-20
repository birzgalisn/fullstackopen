"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatients = () => {
    return patients_1.default.map((_a) => {
        var { ssn, entries } = _a, patient = __rest(_a, ["ssn", "entries"]);
        return patient;
    });
};
const findById = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    return patient;
};
const addPatient = (patient) => {
    const newPatient = Object.assign(Object.assign({}, patient), { entries: [], id: (0, uuid_1.v4)() });
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (id, entry) => {
    const patient = findById(id);
    if (!patient) {
        throw new Error("Unable to find patient");
    }
    const newEntry = Object.assign(Object.assign({}, entry), { id: (0, uuid_1.v4)() });
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    getNonSensitivePatients,
    findById,
    addPatient,
    addEntry,
};
