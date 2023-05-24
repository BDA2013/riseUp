var formButton = document.getElementById('submit');
var latLonUrl = 'https://api.geoapify.com/v1/geocode/search?REQUEST_PARAMS'; //Google
var sunriseUrl = 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today'; //Sunrise API

var locationLon;
var locationLat;



function gatherLatLon(city, state) {

    fetch(`https://api.geoapify.com/v1/geocode/search?city=${city}&state=${state}&format=json&apiKey=50289ffe2e1e48c89c814826023cb2c0`)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        locationLon = data.results[0].lon;
        locationLat = data.results[0].lat;
        loggingInfo(locationLat, locationLon);
        
  });
    /*
    fetch(`https://api.geoapify.com/v1/geocode/search?city=${city}&state=${state}&format=json&apiKey=50289ffe2e1e48c89c814826023cb2c0`)
    .then(response => response.json())
    .then(result => locationLon = result.results[0].lon)
    .catch(error => console.log('error', error));
    
    fetch(`https://api.geoapify.com/v1/geocode/search?city=${city}&state=${state}&format=json&apiKey=50289ffe2e1e48c89c814826023cb2c0`)
    .then(response => response.json())
    .then(result => locationLat = result.results[0].lat)
    .catch(error => console.log('error', error));
    */
    
};



formButton.addEventListener("click", function() {
   var cityInput = document.getElementById("cityInput").value;
   var stateInput = document.getElementById("stateInput").value;
    
    gatherLatLon(cityInput, stateInput);

    //loggingInfo(locationLat, locationLon);
});

function loggingInfo(lat, long) {
    console.log(lat);
    console.log(long);

}