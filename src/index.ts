import express from 'express';
import { ISystemInformation, getSystemInformation } from './sysinfo';

const app = express();
// to differentiate `/foo` and `/foo/`
app.enable('strict routing');
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/v1/sysinfo', async (req, res) => {
  const sysinfo: ISystemInformation = await getSystemInformation();
  res.send(sysinfo);
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
