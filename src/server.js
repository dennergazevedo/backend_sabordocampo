/* eslint-disable func-names */
import app from './app';

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4257');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With',
    'Content-Type'
  );

  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.listen(4257);
