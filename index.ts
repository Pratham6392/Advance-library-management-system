const express = require('express');
const dotenv = require('dotenv');
import { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Library Management System API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
