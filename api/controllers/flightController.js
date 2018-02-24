var fs = require("fs");
var flightService = require('../services/flightService');

exports.searchFlights = function(req, res) {
  let params = {
    origin: req.params.origin,
    destination: req.params.destination
  }
  flightService.searchFlights(params)
  .then((response) => {
    return res.format({
      'text/html': function() {
        res.send(response);
      }
    });
});
};
