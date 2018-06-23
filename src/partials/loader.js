export default (function () {
  $(window)
    .on('load', function () {
      window.loaded = true;
    });

  let mainLoader,
    currOffset,
    count = 0,
    initOffset = parseInt(jQuery('.main-loader svg path')
      .attr('stroke-dashoffset'));

  mainLoader = setInterval(function () {
    count++;
    currOffset = parseInt(jQuery('.main-loader svg path')
      .attr('stroke-dashoffset'));

    hideLoader();

    if (currOffset >= 0) {
      clearInterval(mainLoader);
    }

    jQuery('.main-loader svg path')
      .attr('stroke-dashoffset', currOffset + 5);
    jQuery('.main-loader svg')
      .attr('transform', 'scale(' + count / 400 + ')');
  }, 5);


  jQuery(document)
    .on('shown.bs.tab', function (e) {
      const wrEl = jQuery(jQuery(e.target)
        .attr('href'))
        .parent();
      setTimeout(function () {
        jQuery('body')
          .removeClass('content-loading');
      }, 200);
    })
    .on('hidden.bs.tab', function () {
      jQuery('body')
        .addClass('content-loading');
    });

  function hideLoader() {
    if (window.loaded && currOffset >= initOffset / 8) {
      jQuery('.main-loader')
        .fadeOut(500);
    }
    else {
      setTimeout(hideLoader, 500);
    }
  }

  function showLoader() {
    jQuery('.main-loader')
      .fadeIn(200);
  }

})();
