"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roles_routes_1 = __importDefault(require("./roles.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const express_1 = require("express");
const router = (0, express_1.Router)();
const versionApi = '/api/v1';
router.use(`${versionApi}/roles`, roles_routes_1.default);
router.use(`${versionApi}/user`, user_routes_1.default);
exports.default = router;
