export default (function () {

  const $contentLoader = jQuery('<div></div>')
    .addClass('white-overlay');

  $contentLoader.appendTo('body');

  jQuery(document)
    .on('shown.bs.tab', function (e) {
      setTimeout(function () {
        jQuery('body')
          .removeClass('content-loading');
      }, 2000);
    })
    .on('hidden.bs.tab', function (e) {
      jQuery('body')
        .addClass('content-loading');
    });

})();
