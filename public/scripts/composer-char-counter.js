$(document).ready(function() {
  const charCounter = $('.new-tweet').find('.counter');

  function checkCounter(counter) {
    if (counter < 0) {
     charCounter.attr('id', 'invalid');
    } else {
      charCounter.removeAttr("id", 'invalid');
    }
    return;
  }

  $('.new-tweet').find('textarea').on('keyup', function () {
    let counter = 140 - $(this).val().length;
    charCounter.text(counter);
    checkCounter(counter);
  });

  $('form[action="/tweets/"]').on('submit', function () {
    let counter = 140 - $(this).val().length;
    charCounter.text(counter);
    checkCounter(counter);
  });

});