export default (function () {
  $(window).on("load", function () {
    window.loaded = true;
  });

  let mainLoader,
    currOffset,
    count = 0,
    $path = $(".main-loader svg path"),
    initOffset = parseInt($path.attr("stroke-dashoffset"), 10);

  mainLoader = setInterval(function () {
    count++;
    currOffset = parseInt($path.attr("stroke-dashoffset"), 10);

    hideLoader();

    if (currOffset >= 0) {
      clearInterval(mainLoader);
    }

    $path.attr("stroke-dashoffset", currOffset + 3);
    $(".main-loader svg").attr("transform", "scale(" + count / 500 + ")");
  }, 10);

  $(document)
  .on("shown.bs.tab", function (e) {
    const wrEl = $($(e.target).attr("href")).parent();
    setTimeout(function () {
      $("body").removeClass("content-loading");
    }, 200);
  })
  .on("hidden.bs.tab", function () {
    $("body").addClass("content-loading");
  });

  function hideLoader() {
    if (window.loaded && currOffset >= initOffset / 8) {
      $(".main-loader").fadeOut(500);
    } else {
      setTimeout(hideLoader, 500);
    }
  }

  function showLoader() {
    $(".main-loader").fadeIn(200);
  }
})();
