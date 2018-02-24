const PORT = process.env.FLIGHT_HUNT_PORT || '3001';

var express = require('express'),
  app = express(),
  port = PORT;

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);

console.log('Server started on: ' + port);

