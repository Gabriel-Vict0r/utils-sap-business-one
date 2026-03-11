import express from "express";
import {routes} from './routes';
import {routesAproval} from '../modules/approval/approval.routes';
import dotenv from 'dotenv';
import { getConnection } from "../database/hana";

dotenv.config();

const app = express();

app.use(express.json());

app.use(routes);
app.use(routesAproval);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
/* TESTE DE CONEXÃO COM O HANA */
/*
async function testConnection() { 
  const conn = await getConnection(); 

  const result = conn.exec('SELECT CURRENT_USER FROM DUMMY');
  console.log('Current user:', result);
}

testConnection();
*/
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;