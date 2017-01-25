$(document).ready(function() {

  $('form[action="/tweets/"]').find('input[type="submit"]').on('click', function (event) {
    event.preventDefault();
    console.log($(this).closest('form[action="/tweets/"]').serialize());
  });
});