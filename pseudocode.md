File Set Up:
1. Install all the given packages
2. make the gitignore file
    - this will contain information we don't want to send to github
3. Make these files
    - .env, liri.js, keys.js
4. Inside of liri.js, you have to require your keys.js file and your .env file
    - this is how our file will access the API keys
5. Create the random.txt file
    - add a message to the random file
6. Add the requirements to the liri.js file
    - env /
    - keys /
    - Node-Spotify-API
    - Axios /
    - Moment
7. Test if all the files are linked together 

Program:
1. The user will be able to choose between four commands
    - command choice and what song/movie/band they want info from
        - use process.argv or inquirer
2. Once user has provided the command, we need to check  which one it is
    - use a conditional statement
        - if/else or switch
3. We will check for these four commands
    - we can make seperate functions for each outside of the if statement like in the Bank activity (week 5/day 4/15-BankJS)
    1. concert-this
        - create a function "concert()" 
    2. spotify-this-song
        - create a function "spotify()"
    3. movie-this
        - create a function "movie()"
    4. do-what-it-says
        - create a function "what()"
4. Concert()
    * We will pass the user's band choice to this function
    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")
5. Spotify()
    * we will pass the user's song choice to this function
    * This will show the following information about the song in your terminal/bash window

        * Artist(s)

        * The song's name

        * A preview link of the song from Spotify

        * The album that the song is from

    * If no song is provided then your program will default to "The Sign" by Ace of Base.

    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
6. Movie()
    * pass this function the user's movie choice
    * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
7. What()
    * we need FS to read the random.txt file
        * data.split(", ") [1]
        * call Spotify() with the value from data.split
            - spotify(data.split(", ")[1])



