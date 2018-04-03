$(document).ready(function() {

  $(document).on('click', '.right_nav .dropdown-menu', function(e) {
    e.stopPropagation();
  });

  $('body').on('click', '.navbar_toggler', function() {
    $('body').toggleClass('menu_open');
  });

});