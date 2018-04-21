(function() {

  let $contentBox = $('.content-box'),
      $contentLoader = $('<div>').addClass('white-overlay');

  $contentLoader.appendTo($contentBox);

  $(window).on('resize orientationchange', function() {
    $contentBox.removeClass('content-loading');
  });

  $('[data-toggle="tab"]:not(.active)').on('hide.bs.tab', function(e) {
    $(e.target).closest('.content-box').addClass('content-loading');
  });

  $('[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    setTimeout(function() {
      $(e.target).closest('.content-box').removeClass('content-loading');
    }, 1000);
  });

})();