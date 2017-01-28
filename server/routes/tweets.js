"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

//Function creates unique tweet id
function generateRandomId() {
  let tweetId = Math.random().toString(36).substr(2, 6);
  return tweetId;
}

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    console.log("tweet at route handler", req.body.text);

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      tweet_id: generateRandomId(),
      likes: 0
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.put("/:id", function(req, res) {
    let userId = req.params.id;
    let likeStatus = req.body.likestatus;
    console.log("like status at route handler", likeStatus);
    DataHelpers.saveLike(userId, likeStatus, (err, count) => { if (err) {throw err;} });
    res.status(201).send();
  });



  return tweetsRoutes;

}
