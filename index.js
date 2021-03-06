require('dotenv/config');
require('./src/config/database');
const express = require('express');
const dashboardRouter = require('./src/routes/dashboard');
const projectRouter = require('./src/routes/project');
const cors = require('cors');

const CORS_URL = process.env.CORS_URL;

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: false,
    origin: CORS_URL,
  })
);

app.use('/api/project', projectRouter);
app.use('/api/dashboard', dashboardRouter);

app.listen(process.env.PORT || 8080, () => console.log('Server is running!'));
