var fs = require("fs");

function priceTimeComparator(flight1, flight2) {
  if(flight1.price === flight2.price)  {
    if( (new Date(flight1.departureTime).getTime() < new Date(flight2.departureTime).getTime()) )
    {
      return flight1;
    }
  }
  else if(flight1.price < flight2.price) {
    return flight1;
  }
  else if(flight1.price > flight2.price){
    return flight2;
  }
}

function isEqual(flight1, flight2) {
  if(flight1.origin === flight2.origin &&
    flight1.destination === flight2.destination &&
    flight1.departureTime === flight2.departureTime &&
    flight1.arrivalTime === flight2.arrivalTime &&
    flight1.price === flight2.price)  {
    return true;
  }
  else {
    return false;
  }
}

function existsAfterIndex(list, flight, index) {
  for(j = index+1; j < list.length; j++) {
    if (isEqual(list[j], obj)) {
      return true;
    }
  }
  return false;
}

function removeDuplicates(list) {
  let arr = [];
  for (i = 0; i < list.length; i++) {
    let obj = list[i];
    if(!existsAfterIndex(arr, obj, i)) {
      arr.push(obj);
    }
  }
  return arr;
}

function sort(list) {
  return list.sort(priceTimeComparator);
}

function searchFlights(list, origin, destination) {
  let reducedFlights = list.filter(function (flight) {
    return flight.origin === origin && flight.destination === destination;
  });
  return reducedFlights;
}

function convertToStringResponse(list, providerName) {
  let stringResponses = [];
  let stringResponse = "";
  for (i = 0; i < list.length; i++) {
    stringResponse += list[i].origin + "--->" + list[i].destination + " ( " + providerName + " ) " +  " ( " + list[i].departureTime + "---> " + list[i].destinationTime + " )" + "-" 
      + list[i].price + "<br>";
  }
  return stringResponse;
}

function processFlights(flightList, origin, destination) {
  let flightListResponse = {
    provider1: [],
    provider2: [],
    provider3: []
  };
  
  let stringResponse = "";
  
  flightList.provider1 = searchFlights(flightList.provider1, origin, destination);
  flightList.provider2 = searchFlights(flightList.provider2, origin, destination);
  flightList.provider3 = searchFlights(flightList.provider3, origin, destination);

  flightListResponse.provider1 = removeDuplicates(flightList.provider1);
  flightListResponse.provider2 = removeDuplicates(flightList.provider2);
  flightListResponse.provider3 = removeDuplicates(flightList.provider3);

  flightListResponse.provider1 = sort(flightList.provider1);
  flightListResponse.provider2 = sort(flightList.provider2);
  flightListResponse.provider3 = sort(flightList.provider3);
  
  stringResponse = "<p>" + convertToStringResponse(flightListResponse.provider1, "provider1") + "</p>";
  stringResponse += "<p>" + convertToStringResponse(flightListResponse.provider2, "provider2") + "</p>";
  stringResponse += "<p>" + convertToStringResponse(flightListResponse.provider3, "provider3") + "</p>";
   
  if(flightList.provider1.length === 0 && flightList.provider2.length === 0 && flightList.provider3.length === 0) {
    stringResponse = "No flights found for " + origin + "--->" + destination;
  }
  
  return stringResponse;
}

exports.searchFlights = function({ origin, destination }) {
  return new Promise(function(resolve, reject) {
    fs.readFile( __dirname + "/" + "flights.json", 'utf8', function (err, data) {
       let dataObject = JSON.parse(data);
       resolve(processFlights(dataObject, origin, destination));
     });
  });
};
