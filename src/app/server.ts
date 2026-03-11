import express from "express";
import {routes} from './routes';
import {routesAproval} from '../modules/approval/approval.routes';
const app = express();

app.use(express.json());

app.use(routes);
app.use(routesAproval);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;