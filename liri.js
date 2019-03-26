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
var rescue = input.join(" ");
console.log(rescue);

function bigSwitch(command, rescue) {
    switch (command) {
        case "concert-this": concert(rescue);
            break;
        case "spotify-this-song": song(rescue);
            break;
        case "movie-this": movie(rescue);
            break;
        case "do-what-it-says": what(rescue);
            break;
        default: console.log("please enter an option");
            break;
    }
}
bigSwitch(command, rescue)


function concert(rescue) {
    console.log("Selected Concert");
    axios.get("https://rest.bandsintown.com/artists/" + rescue + "/events?app_id=codingbootcamp").then(
        function (response) {
            // console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i].venue.name, response.data[i].venue.city, response.data[i].datetime);
            }
        }
    )
}

function song(rescue) {
    console.log("Selected Spotify");
    spotify.search({
        type: "track",
        query: rescue,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].album.name);

        //data.tracks.items[0].album.artists[0].name gives us the artist's name
        //data.tracks.items[0].name gives us the name of the song
        //data.tracks.items[0].preview_url give us the url
        //data.tracks.items[0].album.name gives us the album name
    })
}

function movie(rescue) {
    console.log("Selected Movie");
    axios.get("http://www.omdbapi.com/?t=" + rescue + "&y=&plot=short&apikey=trilogy").then(
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
        var data = data.split(",");
        console.log(data);
        var optionRandom = data[0];
        var inputRandom = data[1];
        console.log(optionRandom, inputRandom);
        bigSwitch(optionRandom, inputRandom);
    })
}




