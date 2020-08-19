var express = require("express")
var router = express.Router();
var fs = require('fs');

/**
 * Converts milliseconds to minutes and seconds
 * @param  {millis} The time in milliseconds
 * @return {string} The converted time
 */
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
/**
 * Removes commas from a string
 * @param  {name} Input string with commas
 * @return {string} Input string with no commas
 */
function removeCommas(name) {
    return name.replace(/,/g, '');
}

router.get("/", function(req, res, next) {
    res.send("API works!");
})

router.post("/", function(req, res, next) {
    console.log(req.body);
    var timePlayed = millisToMinutesAndSeconds(req.body.progress_ms);
    var duration = millisToMinutesAndSeconds(req.body.duration_ms);
    var date = new Date(req.body.timestamp).toLocaleDateString("en-GB");
    var time = new Date(req.body.timestamp).toLocaleTimeString("en-GB");
    var name = removeCommas(req.body.name);
    var artist = removeCommas(req.body.artist);
    fs.appendFile(
        'log.csv',
        date + ',' + time + ',' + name + ',' + artist + ',' + timePlayed + ',' + duration +'\n',
        function(err) {
        if (err) throw err;
    })
    res.send('response');
})

module.exports = router;