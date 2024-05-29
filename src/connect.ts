import { Pool } from "pg";
require('dotenv').config();

const client = new Pool({
    host: process.env.POSTGRES_DB_HOST,
    port: Number(process.env.POSTGRES_DB_PORT),
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWD,
    database: process.env.POSTGRES_DB_NAME,
});

export default client;
