"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const connect_1 = __importDefault(require("./connect"));
const body_parser_1 = __importDefault(require("body-parser"));
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield connect_1.default.connect();
        console.log('Conexión exitosa a la base de datos');
        const res = yield conn.query('Select now()');
        console.log(res.rows[0]);
        conn.release();
    }
    catch (err) {
        console.error("Error conectando a la base de datos", err);
    }
});
testConnection();
const app = (0, express_1.default)();
app.use(router_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
app.use(body_parser_1.default.json());
exports.default = app;
