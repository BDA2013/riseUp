//Document Values
var formButton = document.getElementById('submit');
var locationInput = document.getElementById('locationInput');
var riseResult = document.getElementById('timeRise');
var setResult = document.getElementById('timeSet');
var locationPost = document.getElementById('locationPost');
var resultVisibility = document.getElementById('result');
var pacificTimeZone = ["WA", "OR", "NV", "CA"];
var mountainTimeZone = ["MT", "ID", "WY", "UT", "CO", "AZ", "NM"];
var centralTimeZone = ["ND", "SD", "NE", "KS", "OK", "TX", "MN", "IA", "MO", "AR", "LA", "WI", "IL", "MS", "TN", "AL", "KY"];
var easternTimeZone = ["MI", "IN", "OH", "PA", "WV", "VA", "DC", "MD", "DE", "NJ", "NY", "CT", "RI", "MA", "NH", "VT", "ME", "NC", "SC", "GA", "FL"];
var alaskaTimeZone = ["AK"];
var hawaiiTimeZone = ["HI"];

/* Notes: Debug this later to fix the accuracy of the inputed City and State. 
   Delete the '//' by the Console.log if you want to check out what's going on. */
var savedState;

function gatherLatLon(city, state) {
    //It'll contact the URL below
    fetch(`https://api.geoapify.com/v1/geocode/search?city=${city}&state=${state}&format=json&apiKey=50289ffe2e1e48c89c814826023cb2c0`)
        //When it reaches there, it'll gather the data and convert it in JSON
        .then(function (response) {
            return response.json();
        })
        //Afterwards, it'll be able to use any data to be used
        .then(function (data) {
            console.log(data);
            var locationLon = data.results[0].lon;
            var locationLat = data.results[0].lat;
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
            //console.log(data);
            //It'll store data while being splited by ':'
            console.log(data);
            var sunriseArray = data.results.sunrise.split(':');

            //Below will split the last array of sunsetArray
            var sunriseLastArray = sunriseArray[2].split(' ');

            if(sunriseLastArray[1] == 'PM') {
                sunriseLastArray[1] = 'AM';
                sunriseArray[2] = sunriseLastArray.join(' ');
            }


            //The value below will deduct 4 hours for accurate time
            var convertedSunriseHour = subtractHours(parseInt(sunriseArray[0]), savedState);

            //It'll input the value back in the Array
            sunriseArray[0] = convertedSunriseHour;

            //The Final Value
            var sunrise = sunriseArray.join(':');
            
            

            //It'll store data while being splited by ':'
            var sunsetArray = data.results.sunset.split(':');
            //Below will split the last array of sunsetArray
            var sunsetLastArray = sunsetArray[2].split(' ');
            //AM will be converted to PM in the 'containsAM' function.
            var changedLastArray = containsAM(sunsetLastArray);

            //The value below will deduct 4 hours for accurate time
            var convertedSunsetHour = subtractHours(parseInt(sunsetArray[0]), savedState)
            //It'll input the value back in the Array
            sunsetArray[0] = convertedSunsetHour;
            //The change to PM will be added back in the Array
            sunsetArray[2] = changedLastArray.join(' ');
            //The Final Value
            var sunset = sunsetArray.join(':');

            resultVisibility.style.visibility = "visible";
            riseResult.innerHTML = "Sunrise Time: " + sunrise;
            setResult.innerHTML = "Sunset Time: " + sunset;

            //console.log(sunrise);
            //console.log(sunset);
        });
};

function subtractHours(storedHour, state) {
    for (var p = 0; p < pacificTimeZone.length; p++) {
        for (var m = 0; m < mountainTimeZone.length; m++) {
            for (var c = 0; c < centralTimeZone.length; c++) {
                for (var e = 0; e < easternTimeZone.length; e++) {
                    switch (state) {
                        case pacificTimeZone[p]:
                            intHour = storedHour - 7;
                            realHour = intHour; 
                            break;
                        case mountainTimeZone[m]:
                            intHour = storedHour - 7;
                            realHour = intHour; 
                            break;
                        case centralTimeZone[c]:
                            intHour = storedHour - 5;
                            realHour = intHour; 
                            break;
                        case easternTimeZone[e]:
                            intHour = storedHour - 4;
                            realHour = intHour; 
                            break;
                        case alaskaTimeZone[0]:
                            intHour = storedHour - 6;
                            realHour = intHour; 
                            break;
                        case hawaiiTimeZone[0]:
                            intHour = storedHour - 10;
                            realHour = intHour; 
                            break;
                    }
                }
            }
        }
    }

    if (realHour <= 0) {
        realHour += 12;
        return realHour; // Return the subtracted hour
        } else {
        return realHour; // Return the subtracted hour
    };
}

function containsAM(index) {
    //If the Array contains AM, it'll be changed to PM
    if (index[1] == 'AM') {
        index[1] = 'PM';
    };
    //It'll return the change to be assigned
    return index;
};

function loggingInfo(lat, long) {
    //It'll print out the following variables on the Console
    console.log(lat);
    console.log(long);
}

function gatherLocationInput() {
    //The "locationInput" will read the input that was typed in
    var locationInput = document.getElementById('locationInput').value;
    locationPost.innerHTML = locationInput;
    //console.log(locationInput);
    //Ex:
    //Output:
    //Englewood, NJ

    //The "inputArray" will make the one input into two separate values as an array separated by the comma.
    var inputArray = locationInput.split(',');
    //console.log(inputArray);
    //Ex:
    //Output:
    //['Englewood'], [' NJ']

    //The "fixedStateArray" will trim the space from the beginning of the Array
    var fixedStateArray = inputArray[1].trimStart();

    //Replaced the inputArray[1] with the trimed file
    inputArray[1] = fixedStateArray;
    savedState = fixedStateArray;
    console.log(inputArray)
    //['Englewood'] ['NJ']

    //the two data will be pushed into the function below 
    gatherLatLon(inputArray);
}

//It'll listen for the click on the Submit button
formButton.addEventListener("click", function () {
    //Once the event occured it'll intiate the function(s) below
    if (resultVisibility.style.visibility == "visible") {
        resultVisibility.style.visibility = "hidden";
        gatherLocationInput();
    } else {
        gatherLocationInput();
    }
    
});

//It'll listen for the Enter key as an alternative
locationInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        if (resultVisibility.style.visibility == "visible") {
            resultVisibility.style.visibility = "hidden";
            gatherLocationInput();
        } else {
            gatherLocationInput();
        }
    }
});