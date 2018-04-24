/**
 * Application entry point
 */
import * as $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'owl.carousel/dist/owl.carousel.min';
import 'select2/dist/js/select2.min';
// Load application styles
import './assets/styles/index.scss';
import SelectCountry from './components/select2.country';
import RangeSliders from '././components/range-sliders';
import './components/loader';
import './scripts/brand-find-influencer';

// Adding a cool transition
$.extend($.easing, {
  easeNav(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
  },
});


$(document).ready(
  () => {
    $('select').select2({
      minimumResultsForSearch: -1,
      templateResult: $(this)
        .hasClass('with-flags') ? SelectCountry : undefined,
      templateSelection: $(this)
        .hasClass('with-flags') ? SelectCountry : undefined,
    });
    $('body')
      .on('click', '.navbar_toggler', () => {
        $('body')
          .toggleClass('menu_open');
      })
      .on('click', '.find-influencer--navtabs a[data-toggle="tab"]', function (e) {
        e.stopPropagation();
        $(this).tab('show');
      });
  },
  () => {
    let $contentBox = $('.content-box'),
      $contentLoader = $('<div>')
        .addClass('white-overlay');

    $contentLoader.appendTo($contentBox);

    $(window)
      .on('resize orientationchange', () => {
        $contentBox.removeClass('content-loading');

      });

    $('[data-toggle="tab"]:not(.active)')
      .on('hide.bs.tab', (e) => {
        $(e.target)
          .closest('.content-box')
          .addClass('content-loading');
      });

    $('[data-toggle="tab"]')
      .on('shown.bs.tab', (e) => {
        setTimeout(() => {
          $(e.target)
            .closest('.content-box')
            .removeClass('content-loading');
        }, 1000);
      });
  },
  RangeSliders()
);
