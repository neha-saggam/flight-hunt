'use strict';
module.exports = function(app) {
  var flightController = require('../controllers/flightController');

  // todoList Routes
  app.route('/searchFlights/:origin/:destination')
    .get(flightController.searchFlights)
};
