import express from 'express';
import api from './api/index.js';
import {notFoundHandler, errorHandler} from './middlewares/error-handlers.js';

const app = express();

app.use('/public', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.use('/api/v1', api);

// Handle routes that do not exist
app.use(notFoundHandler);

// Error handler must be the last middleware
app.use(errorHandler);

export default app;
