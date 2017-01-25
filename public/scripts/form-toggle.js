$(document).ready(function() {

  $('#nav-bar').find('#compose').on('click', function() {

    $(this).closest('body').find('.new-tweet').slideToggle(200);
    $(this).closest('body').find('[action="/tweets/"]').find('textarea').focus();

  });

});