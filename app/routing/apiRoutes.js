var path = require('path'),
    friends = require('../data/friends');

module.exports = function(app) {
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function(req, res) {

        var userScores = req.body.scores,
            totalDifference = 0,
            matchComparisonScore = [],
            bestMatch;

        //parent loop for friends array
        for (var f = 0; f < friends.length; f++) {

            totalDifference = 0;

            //child loop to set totalDifference for each friend
            for (var i = 0; i < userScores.length; i++) {

                totalDifference += (Math.abs(userScores[i] - friends[f].scores[i]));
            }

            //add all friends to array
            matchComparisonScore.push(friends[f]);

            //add totaldifference to each friends object
            matchComparisonScore[f].differenceScore = totalDifference;
        }

        //evaluate the best match based on differenceScore
        var bestMatch = matchComparisonScore[0];
        for (var m = 0; m < matchComparisonScore.length; m++) {

            //does [m] have a lower differenceScore than current bestMatch...
            if (bestMatch.differenceScore > matchComparisonScore[m].differenceScore

                //and need a friend more than current bestMatch?
                && bestMatch.friendNeedness < matchComparisonScore[m].friendNeedness)

            //if so we have a new match
                bestMatch = matchComparisonScore[m];
        }

        //dump the array for fresh values on the next post
        matchComparisonScore = [];

        //and away we go
        res.send(bestMatch);
    });
};
