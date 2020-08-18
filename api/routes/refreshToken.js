var express = require('express');
var querystring = require('querystring');
var request = require('request');
var router = express.Router();
require('dotenv').config();

// Spotify API credentials
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = 'http://localhost:9000/callback'; // Your redirect uri

var stateKey = 'spotify_auth_state';


router.post('/', function(req, res) {

    // requesting access token from refresh token
    var refresh_token = req.body.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };
    console.log(refresh_token);

    request.post(authOptions, function(error, response, body) {
        console.log("Posting refresh request");
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.redirect('http://localhost:3000/#' +
                querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
        } else {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'invalid_token'
                }));
        };
        console.log(response.body);
    });
});

module.exports = router;