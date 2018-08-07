import Masonry from 'masonry-layout';
import '../partials/range-sliders';
import '../partials/filters/filters';
import '../partials/input.tags';
import '../partials/owl-bootstrap-tabs/owl.bootstrap.tabs';

import { Influencer } from '../partials/influencer.card';


(!!document.querySelector('.find-influencer')) && (function () {

  let $fixedNavHeight,
    $sectionsWrapperOffset,
    msnry;

  const $fixedNav = jQuery('.single-card--fixednav');
  const $sectionsWrapper = jQuery('.single-card--sections');
  const $singleInflModal = jQuery('.modal-single--influencer');
  const updateOffsets = function (element) {
    let cacheScrolltop = jQuery(element)
      .scrollTop();
    $fixedNavHeight = $fixedNav.outerHeight();
    $sectionsWrapperOffset = $sectionsWrapper.position().top;

    jQuery(element)
      .scrollTop(0)
      .scrollspy('dispose')
      .scrollspy({
        offset: $fixedNavHeight + 2
      })
      .scrollTop(cacheScrolltop);
  };
  const likeProfileToggle = function (profile, callback) {
    //TODO dummy function to make ajax call to like profile

    if (profile.hasClass('liked')) {

      profile.removeClass('liked');
    }
    else {
      profile.addClass('liked');
    }

    if (typeof callback === 'function') {
      callback();
    }
  };

  $singleInflModal
    .on('scroll', function (e) {

      if (jQuery(this)
        .scrollTop() > jQuery('.single-card--fixednav')
        .outerHeight()) {
        $fixedNav.addClass('down');
      }
      else {
        $fixedNav.removeClass('down');
      }
    });

  jQuery(document)
    .ready(function () {
      // vanilla JS
// init with element
      var grid = document.querySelector('.grid');
      msnry = new Masonry(grid, {
        // options...
        itemSelector: '.grid-item',
        columnWidth: 200,
        horizontalOrder: true
      });

// init with selector
      msnry = new Masonry('.grid', {
        // options...
      });
    });

  jQuery(document)
    .on('show.bs.modal', '.modal-single--influencer', function (e) {
      let $thisCard = jQuery(e.relatedTarget)
        .closest('.single-profile--card');
      let inflName = $thisCard.data('infname');
      let gscore = $thisCard.data('gscore');
      jQuery(this)
        .find('.single-card--name')
        .text(inflName);
      jQuery(this)
        .find('.single-infl--gscore')
        .html(Influencer.gsScoreHandler(gscore) || '');
      $thisCard.append(jQuery(this));

    })
    .on('hide.bs.modal', '.modal-single--influencer', function (e) {
      jQuery('body')
        .append(jQuery(this));
    })
    .on('shown.bs.modal', '.modal-single--influencer', function () {
      updateOffsets(jQuery(this));
    })
    .on('hide.bs.dropdown', '.keepDropdownOpen .dropdown.show', function (e) {
      e.preventDefault();
    })
    .on('shown.bs.tab', function (e) {
      jQuery(jQuery(e.target)
        .attr('href') + ' .owl-carousel')
        .resize();
    })
    .on('click', 'a.nav-link[href^="#"]', function (e) {
      e.preventDefault();
      const $target = jQuery(jQuery(this)
        .attr('href'));

      $singleInflModal.animate({
        'scrollTop': $target.position().top - $fixedNavHeight + 3
      }, 600, 'easeNav');
    })
    .on('click', '.single-card--infobtn', function (e) {
      let _profile = jQuery(e.currentTarget)
          .parents('.single-profile--card'),
        _slider = _profile.find('.owl-carousel');

      _slider.trigger('to.owl.carousel', _slider.data('owl.carousel')._items.length - 1);
    })
    .on('click', '.single-card--likebtn', function () {
      let _self = jQuery(this),
        _profile = _self.parents('.single-profile--card');
      likeProfileToggle(_profile);
    })
    .on('click', '.single-influencer--archive', function () {

      let $btn = jQuery(this),
        $colmn = $btn.parents('.single-profile--card')
          .parent(),
        $modal = $colmn.find('.modal-single--influencer');


      if ($modal.length > 0) {
        $modal.modal('hide')
          .delay(500)
          .queue(function (next) {
            $colmn.addClass('zoomingOut')
              .delay(500)
              .queue(function (next2) {
                jQuery(this)
                  .remove();
                next2();
              });
            next();
          });
        return;
      }

      $colmn.addClass('zoomingOut')
        .delay(500)
        .queue(function (next) {
          jQuery(this).remove();
          next();
          msnry.layout();
        });


    })
    .on('click', '.dropdown-menu.show', function (e) {
      !e.target.dataset.dismiss && e.stopPropagation();
    });

  jQuery('.badge-outline--dark,.single-infl--gscore')
    .tooltip();


  jQuery('.find-influencer--navtabs')
    .owlTabs({
      navText: [
        '<i class="icon-arrow-left-bold"></i>',
        '<i class="icon-arrow-right-bold"></i>'
      ]
    });

  jQuery('.single-card--carousel')
    .owlCarousel({
      nav: true,
      loop: true,
      items: 1,
      onInitialized: owlFix,
      onRefreshed: owlFix,
      dots: false,
      navText: [
        '<i class="icon-arrow-left-bold"></i>',
        '<i class="icon-arrow-right-bold"></i>'
      ]
    });

  jQuery(window)
    .on('resize orientationchange', function () {
      updateOffsets('.modal-single--influencer');
      jQuery('.owl-carousel')
        .trigger('refresh.owl.carousel');
    })
    .resize();

  function owlFix(owl) {
    const $parentEl = owl.relatedTarget.$element.closest('.single-card--owlwrapper');
    const targetW = Math.trunc(owl.relatedTarget.$element.closest('.single-profile--card')
      .width());

    $parentEl.width(targetW);
  }

})();

