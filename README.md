# spotify-logger
Spotify-logger is a web application for tracking your Spotify listening in real-time and outputting information about your listening activity to a CSV file. Compared to other tracking services (such as Last.fm), you can track how long you listen to a song and keep track of which songs you skip.

## Implementation
This application is written in Javascript with Node.js, using Express.js for the server side and React.js for the client side. It uses the Spotify API to retrieve data about the user's listening activity. The output is written to an existing CSV located in ```/api/log.csv```.

## Installation 
Before running the application, first the required dependencies must be installed. This can be done by running the command ``` npm install``` once in the /client directory, and once in the /api directory.
Then, to start the server, run the following command in the /api directory:
```javascript
npm start // start server on localhost:9000
```
Similarly for the client, run the same command in the /client directory:
```javascript
npm start // start client on localhost:3000
```
Finally, navigate to ```localhost:9000``` to log in with your Spotify account and start using Spotify-logger! See example screenshots below.

### Browser view
![Alt text](/screenshots/browser.png?raw=true)
### Output file (log.csv)
![Alt text](/screenshots/output.png?raw=true)
