/**
 * Application entry point
 */

// Load application styles
import './assets/styles/index.scss';
import 'popper.js/dist/popper.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'owl.carousel/dist/owl.carousel.min';
import 'select2/dist/js/select2.min';
import SelectCountry from 'components/select2.country';
import RangeSliders from './components/range-sliders';
import TabsCarousel from 'components/tabs-carousel';
import 'components/loader';
import './scripts/brand-find-influencer';

// Adding a cool transition
$.extend($.easing, {
  easeNav: function (t) {
    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
  }
});


$(document).ready(
  function () {
    $('select').select2({
      minimumResultsForSearch: -1,
      templateResult: $(this)
        .hasClass('with-flags') ? SelectCountry : undefined,
      templateSelection: $(this)
        .hasClass('with-flags') ? SelectCountry : undefined
    });
    $('body')
      .on('click', '.navbar_toggler', function () {
        $('body')
          .toggleClass('menu_open');
      })
      .on('click', '.dropdown-menu a[data-toggle="tab"]', function (e) {
        e.stopPropagation();
        $(this).tab('show');
      })

  },
  function () {

    let $contentBox = $('.content-box'),
      $contentLoader = $('<div>')
        .addClass('white-overlay');

    $contentLoader.appendTo($contentBox);

    $(window)
      .on('resize orientationchange', function () {
        $contentBox.removeClass('content-loading');
      });

    $('[data-toggle="tab"]:not(.active)')
      .on('hide.bs.tab', function (e) {
        $(e.target)
          .closest('.content-box')
          .addClass('content-loading');
      });

    $('[data-toggle="tab"]')
      .on('shown.bs.tab', function (e) {
        setTimeout(function () {
          $(e.target)
            .closest('.content-box')
            .removeClass('content-loading');
        }, 1000);
      });

  },
  RangeSliders(),
  TabsCarousel()
);
