export default (() => {
  $(document).ready(function () {
      let $contentBox = $('.content-box'),
        $contentLoader = $('<div></div>')
          .addClass('white-overlay');

      $contentLoader.appendTo($contentBox);

      $(window)
        .on('resize orientationchange', function () {
          $contentBox.removeClass('content-loading');
          $('body')
            .removeClass('filter-open');
        });

      $('[data-toggle="tab"]:not(.active.show)')
        .closest('.dropdown')
        .on('hide.bs.tab', function (e) {
          $(e.target)
            .closest('.content-box')
            .addClass('content-loading');
        });

      $('[data-toggle="tab"]')
        .closest('.dropdown')
        .on('shown.bs.tab', function (e) {
          $(e.target)
            .closest('.content-box')
            .removeClass('content-loading');
        });

    });
})();
