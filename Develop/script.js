var latLonUrl = 'https://api.geoapify.com/v1/geocode/search?REQUEST_PARAMS'; //Google
var sunriseUrl = 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today'; //Sunrise API



 var cityInput = document.getElementById("cityInput").value;
 var stateInput = document.getElementById("stateInput").value;


function gatherLatLon() {
    fetch(`https://api.geoapify.com/v1/geocode/search?city=${cityInput}&state=${stateInput}&format=json&apiKey=50289ffe2e1e48c89c814826023cb2c0`)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
};

gatherLatLon();