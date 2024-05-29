"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require('dotenv').config();
const client = new pg_1.Pool({
    host: process.env.POSTGRES_DB_HOST,
    port: Number(process.env.POSTGRES_DB_PORT),
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWD,
    database: process.env.POSTGRES_DB_NAME,
});
exports.default = client;
