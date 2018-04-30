export default (function () {
  $(window)
    .on('load', function () {
      window.loaded = true;
    });

  const $contentLoader = jQuery('<div></div>')
    .addClass('white-overlay');

  let mainLoader,
    count = 0,
    initOffset = parseInt(jQuery('.main-loader svg path')
      .attr('stroke-dashoffset')),
    currOffset;

  mainLoader = setInterval(function () {
    count++;
    currOffset = parseInt(jQuery('.main-loader svg path')
      .attr('stroke-dashoffset'));

    if (window.loaded && currOffset >= initOffset / 3) {
      jQuery('.main-loader').fadeOut(1000);
    }

    if (currOffset >= 0) {
      clearInterval(mainLoader);
    }

    jQuery('.main-loader svg path')
      .attr('stroke-dashoffset', currOffset + 5);
    jQuery('.main-loader svg')
      .attr('transform', 'scale(' + 1 / count * 400 + ')');
  }, 5);


  jQuery(document)
    .on('shown.bs.tab', function (e) {
      const wrEl = jQuery(jQuery(e.target)
        .attr('href'))
        .parent();
      $contentLoader.appendTo(wrEl);
      setTimeout(function () {
        jQuery('body')
          .removeClass('content-loading');
      }, 200);
    })
    .on('hidden.bs.tab', function () {
      jQuery('body')
        .addClass('content-loading');
      $contentLoader.remove();
    });

})();
