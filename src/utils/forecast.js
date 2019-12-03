const request = require("request");

const foreCast = (latitude, longtitude, callback) => {
    const url = "https://api.darksky.net/forecast/e850d1ea9762df839338449fff4d325e/"+latitude+","+longtitude+"?units=si";
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to weather service!", undefined);
        }else if(body.error){
            callback("Unable to find the location!", undefined);
        }else{
            callback(undefined, body.daily.data[0].summary +" There is currently "+ body.currently.temperature +" degrees out.There is a "+body.currently.precipProbability+"% chance of rain."+
                     "The humidity is currently "+body.currently.humidity+" with the wind speed of "+body.currently.windSpeed+".");
        }
    });
}

module.exports = foreCast;