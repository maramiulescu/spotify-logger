var express = require('express');
var querystring = require('querystring');
var request = require('request');
var router = express.Router();

// Spotify API credentials
var client_id = '09887c2c967f4561be433ac810473860'; // Your client id
var client_secret = 'd28d5990fc3b44a0899205ce780d1d9f'; // Your secret
var redirect_uri = 'http://localhost:9000/callback'; // Your redirect uri

var stateKey = 'spotify_auth_state';

router.get('/', function(req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

module.exports = router;