var fs = require("fs");
var flightService = require('../services/flightService');

exports.searchFlights = function(req, res) {
  let params = {
    origin: req.params.origin,
    destination: req.params.destination
  }
  flightService.searchFlights(params)
  .then((response) => res.status(200).json(response));
};
