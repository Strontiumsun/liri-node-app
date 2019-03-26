// this file will contain the program
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
// this one goes later
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format("MM/DD/YYYY");

var command = process.argv[2];

// I put in this code so that the program could accept movies with more than one-word names
var input = "";
input = process.argv;
input.shift();
input.shift();
input.shift();
input.join(" ,");
console.log(input);

switch (command) {
    case "concert-this": concert();
        break;
    case "spotify-this-song": song(input);
        break;
    case "movie-this": movie();
        break;
    case "do-what-it-says": what();
        break;
    default: console.log("please enter an option");
        break;
}

function concert() {
    console.log("Selected Concert");
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function (response) {
            // console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name, response.data[i].venue.city, response.data[i].datetime);
            }
        }
    )
}

function song() {
    console.log("Selected Spotify");
    spotify.search({
        type: "track",
        query: input,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks);
    })
}

function movie() {
    console.log("Selected Movie");
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log(response.data.Title, response.data.Year,
                response.data.imdbRating, response.data.Ratings[1].Value,
                response.data.Country, response.data.Language, response.data.Plot,
                response.data.Actors);
            // I used this code to help determine where the Rotten Tomatoes rating was.
            // for (var i = 0; i < response.data.Ratings.length; i++) {
            //     console.log(response.data.Ratings[i]);
            // }
        }
    );

}
function what() {
    console.log("Selected Random");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        var data = data.split(", ");
        console.log(data);
        song(data);
    })
}




