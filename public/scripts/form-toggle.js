$(document).ready(function() {

  $('#nav-bar').find('#compose').on('click', function() {

    $(this).closest('body').find('.new-tweet').slideToggle(200);
    $(this).closest('body').find('[action="/tweets/"]').find('textarea').focus();

    //Toggle  styling depending on selected state
    if ($(this).attr('id') === 'compose' ) {
      $(this).attr('id', 'compose-unselected');
    } else {
      $(this).attr('id', 'compose');
    }

  });

});