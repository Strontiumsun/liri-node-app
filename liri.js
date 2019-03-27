// this file will contain the program
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
// this one goes later
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
moment().format();

var command = process.argv[2];

// I put in this code so that the program could accept movies, etc. with more than one-word names
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
            for (var i = 0; i < response.data.length; i++) {
                var captureDate = response.data[i].datetime;
                var dateConvert = moment(captureDate).format("MM/DD/YYYY");
                console.log("Venue: " + response.data[i].venue.name + "\nCity: " + response.data[i].venue.city + ", " + response.data[i].venue.country + "\nDate: " + dateConvert);
                console.log("---------------");
            }
        }
    )
}

function song(rescue) {
    console.log("Selected Spotify");
    if (!rescue) {
        rescue = "The Sign Ace of Base";
    }
    spotify.search({
        type: "track",
        query: rescue,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log(
                "Artist's Name: " + data.tracks.items[i].album.artists[0].name + "\nSong Name: " + data.tracks.items[i].name
                + "\nPreview: " + data.tracks.items[i].preview_url + "\nAlbum Name: " + data.tracks.items[i].album.name
            );
            console.log("---------------");
        }
        //data.tracks.items[0].album.artists[0].name gives us the artist's name
        //data.tracks.items[0].name gives us the name of the song
        //data.tracks.items[0].preview_url give us the url
        //data.tracks.items[0].album.name gives us the album name
    })
}

function movie(rescue) {
    console.log("Selected Movie");
    if (!rescue) {
        rescue = "Mr. Nobody"
    }
    axios.get("http://www.omdbapi.com/?t=" + rescue + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("---------------");
            console.log("Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDb Rating: " + response.data.imdbRating +
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country +
                "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
            console.log("---------------");
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




