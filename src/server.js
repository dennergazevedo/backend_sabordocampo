/* eslint-disable no-console */
/* eslint-disable func-names */
import app from './app';

require('dotenv').config();

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  next();
});

app.disable('x-powered-by');

app.listen(process.env.PORT, () => {
  console.log(`Servindo na porta ${process.env.PORT}`);
});
