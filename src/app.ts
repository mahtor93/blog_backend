import express from "express";
import router from "./routes/router";
import client from "./connect";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
    try{
        const conn = await client.connect();
        console.log('Conexión exitosa a la base de datos');
        const res = await conn.query('Select now()');
        console.log(res.rows[0]);
        conn.release();
    } catch(err){
        console.error("Error conectando a la base de datos", err);
    }
}
testConnection();

const app = express();
app.use(bodyParser.json())
app.use(express.json())
app.use(router);
const port = 3000;
app.listen(port,()=>{
    console.log(`Server running at ${port}`);
})




export default app;