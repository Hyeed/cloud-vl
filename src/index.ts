// import { helloWorld } from './hello-world';

// const greet = helloWorld();
// console.log(greet);

// import express, { Request, Response } from 'express';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const phrases = [
  'Get ready to be inspired...',
  'See rejection as redirection.',
  'There is beauty in simplicity.',
  'You can’t be late until you show up.',
  'Maybe life is testing you. Don’t give up.',
  'Impossible is just an opinion.',
  'Alone or not you gonna walk forward.',
];

app.get('/api/v1/sysinfo', (req, res) => {
  const number = Math.floor(Math.random() * 7);
  res.send(phrases[number]);
});

app.get('*', (req, res) => {
  // res.status(404).send('Sorry, this is an invalid URL.');
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
