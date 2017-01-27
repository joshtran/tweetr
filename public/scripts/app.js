/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //Convert unixtime stamp and find difference
  function dateDifference(postDate) {
    // get total seconds between the times
    var delta = Math.abs(Date.now() - postDate) / 1000;
    // calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400
    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    // what's left is seconds
    var seconds = delta % 60;

    if (days > 1) {
      return days + " days ago";
    }
    if (days === 1) {
      return days + " day ago";
    }
    if (days < 1 && minutes < 60) {
      return minutes + " minutes ago";
    }
    if (minutes === 60) {
      return hours + " hour ago";
    }
    if (minutes > 60) {
      return hours + " hours ago"
    }
  }

  function loadTweets() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: function (getTweets) {
        renderTweets(getTweets);
      }
    });
  }

  loadTweets();

  function renderTweets(tweetArray) {
    // loops through tweets
    for (let key in tweetArray) {
      // calls createTweetElement for each tweet
      let currentTweet = createTweetElement(tweetArray[key]);
      // takes return value and appends it to the tweets container
      $('.display-tweet').prepend(currentTweet);
    }
    //Must wait for DOM elements to be generated before trying to access them for like button
    $('.like').on('click', function() {
      event.preventDefault();
      $(this).attr('id', 'selected');

    });
  }

  function createTweetElement(tweetObj) {

    //containers
    let tweetHeader = $("<header>");
    let tweetContainer = $("<div>").addClass("tweet-content");
    let tweetFooter = $("<footer>")

    //elements to plug into header
    let tweetAvatar = $("<img>").addClass("avatar").attr("src", tweetObj["user"].avatars.small);
    let tweetUsername = $("<span>").addClass("username").append(tweetObj["user"].name);
    let tweetHandle = $("<span>").addClass("handle").append(tweetObj["user"].handle);

    //plug into header
    tweetHeader.append(tweetAvatar);
    tweetHeader.append(tweetUsername);
    tweetHeader.append(tweetHandle);

    //elements to plug into container
    let tweet = $("<span>").text(tweetObj["content"].text);

    //plug into container
     tweetContainer.append(tweet);

    //elements to plug into footer
    let tweetDate = $("<span>").addClass("post-date").append(dateDifference(tweetObj["created_at"]));
    let tweetButtons = $("<span>").addClass("buttons");
    let iconFlag = $("<i>").addClass("fa fa-flag");
    let iconRT = $("<i>").addClass("fa fa-retweet");
    let iconHeart = $("<i>").addClass("fa fa-heart");
    let likeButton = $("<a>").addClass("like").attr('id', 'unselected').append(iconHeart);
    tweetButtons.append(iconFlag, iconRT, likeButton);

    //plug into footer
    tweetFooter.append(tweetDate);
    tweetFooter.append(tweetButtons);

    //output
    let tweetArticle = $("<article>").addClass("tweet").append(tweetHeader);
    tweetArticle.append(tweetContainer);
    tweetArticle.append(tweetFooter);

    return tweetArticle;
  }

  $('form[action="/tweets/"]').on('submit', function (event) {
    //Stop default submit behaviour
    event.preventDefault();
    //Validation variable
    let $submission = $(this).find('textarea').val().length
    //Validate submission
    if ($submission === 0) {
      alert("no tweet");
    } else if ($submission > 140) {
      alert("too many characters");
    } else {
      //Submit the form using Ajax
      $.ajax({
        url: '/tweets/',
        method: 'post',
        data: $(this).serialize()
      }).then(function loadTweets() {
        $.ajax({
          url: 'http://localhost:8080/tweets',
          method: 'GET',
          success: function (getTweets) {
            let inputArr = [];
            inputArr.push(getTweets[getTweets.length - 1]);
            renderTweets(inputArr);
          }
        });
      });
      $(this).find('textarea').val("");
    }

  });
});