//Value(s)
var formButton = document.getElementById('submit');

var sunriseUrl = 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today'; //Sunrise API

var locationLon;
var locationLat;
var sunset;
var sunrise;


//Note: Debug this later to fix the accuracy of the inputed City and State
function gatherLatLon(city, state) {
    //It'll contact the URL below
    fetch(`https://api.geoapify.com/v1/geocode/search?city=${city}&state=${state}&format=json&apiKey=50289ffe2e1e48c89c814826023cb2c0`)
    //When it reaches there, it'll gather the data and convert it in JSON
    .then(function (response) {
        return response.json();
    })
    //Afterwards, it'll be able to use any data to be used
    .then(function (data) {
        //console.log(data);
        locationLon = data.results[0].lon;
        locationLat = data.results[0].lat;
        //the two data will be pushed into the function below 
        loggingInfo(locationLat, locationLon);
        setLatLon(locationLat, locationLon);
  });
};

function setLatLon(lat, lon) {
    //It'll contact the URL below
    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&date=today`)
    //When it reaches there, it'll gather the data and convert it in JSON
    .then(function (response) {
        return response.json();
    })
    //Afterwards, it'll be able to use any data to be used
    .then(function (data) {
        console.log(data);
        sunsetArray = data.results.sunset.split(':');
        //console.log(sunsetArray);
        var convertedSunsetHour = subtract4Hours(parseInt(sunsetArray[0]))
        sunsetArray[0] = convertedSunsetHour;
        console.log(sunsetArray);
        sunset = sunsetArray.join(':');

        sunrise = data.results.sunrise;
        console.log(sunrise)
        sunriseArray = data.results.sunrise.split(':');
        //console.log(sunriseArray);
        var convertedSunriseHour = subtract4Hours(parseInt(sunriseArray[0]))
        sunriseArray[0] = convertedSunriseHour;
        //console.log(sunriseArray);
        sunrise = sunriseArray.join(':');

        console.log(sunrise);
        console.log(sunset);
        

  });
};

function subtract4Hours(currentHour) {
    intHour = currentHour - 4;
    realHour = intHour.toString();

    console.log(realHour);
    return realHour;
}


function loggingInfo(lat, long) {
    //It'll print out the following variables on the Console
    console.log(lat);
    console.log(long);
}

function gatherLocationInput(){
    //The "locationInput" will read the input that was typed in
    var locationInput = document.getElementById('locationInput').value;
    console.log(locationInput);
    //Ex:
    //Output:
    //Englewood, NJ

    //The "inputArray" will make the one input into two separate values as an array separated by the comma.
    var inputArray = locationInput.split(',');
    console.log(inputArray);
    //Ex:
    //Output:
    //['Englewood'], [' NJ']

    //The "fixedStateArray" will trim the space from the beginning of the Array
    var fixedStateArray = inputArray[1].trimStart();

    //Replaced the inputArray[1] with the trimed file
    inputArray[1] = fixedStateArray;
    console.log(inputArray)
    //['Englewood'] ['NJ']

    //the two data will be pushed into the function below 
    gatherLatLon(inputArray);
  }

//It'll listen for the click on the Submit button
formButton.addEventListener("click", function() { 
    //Once the event occured it'll intiate the function(s) below
    gatherLocationInput()
});