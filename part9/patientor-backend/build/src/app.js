"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("./controllers/diagnoses"));
const patients_1 = __importDefault(require("./controllers/patients"));
const ping_1 = __importDefault(require("./controllers/ping"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.set("json spaces", 2);
app.use("/api/ping", ping_1.default);
app.use("/api/diagnoses", diagnoses_1.default);
app.use("/api/patients", patients_1.default);
exports.default = app;
