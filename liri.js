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
var input = process.argv[3];

switch (command) {
    case "concert-this": concert(input);
        break;
    case "spotify-this-song": spotify(input);
        break;
    case "movie-this": movie(input);
        break;
    case "do-what-it-says": what();
        break;
    default: console.log("please enter an option");
        break;
}

function concert() {
    console.log("Selected Concert");
}

function spotify() {
    console.log("Selected Spotify");
}

function movie() {
    console.log("Selected Movie");
}
function what() {
    console.log("Selected Random");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        var data = data.split(", ");
        console.log(data);
    })
}




