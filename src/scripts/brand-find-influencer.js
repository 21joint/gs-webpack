import '../partials/loader';
import '../partials/owl-bootstrap-tabs/owl.bootstrap.tabs';
import { Helpers } from '../helpers/helpers';


(!!document.querySelector('.find-influencer')) && (function () {

  let $fixedNavHeight,
    $sectionsWrapperOffset;

  const $profileLikeButton = jQuery('.single-card--likebtn');
  const $fixedNav = jQuery('.single-card--fixednav');
  const $sectionsWrapper = jQuery('.single-card--sections');
  const $singleInflModal = jQuery('.modal-single--influencer');
  const updateOffsets = function () {
    $fixedNavHeight = $fixedNav.outerHeight();
    $sectionsWrapperOffset = $sectionsWrapper.position().top;
    refreshScrollSpy('.modal-single--influencer');
  };
  const getFixedNavHeight = function () {
    return $fixedNav.outerHeight();
  };
  const likeProfileToggle = function (profile, callback) {
    //dummy function to make ajax call to like profile
    console.warn('TODO: make ajax call to like profile', console);

    if (profile.hasClass('in-likes')) {

      profile.removeClass('in-likes');
    }
    else {
      profile.addClass('in-likes');
    }

    if (typeof callback === 'function') {
      callback();
    }
  };
  const refreshScrollSpy = function (element) {
    let cacheScrolltop = jQuery(element)
      .scrollTop();
    jQuery(element)
      .scrollTop(0)
      .scrollspy('refresh')
      .scrollTop(cacheScrolltop);
  };

  $profileLikeButton.on('click', function () {
    let _self = jQuery(this),
      _profile = _self.parents('.single-profile--card');

    likeProfileToggle(_profile);
  });
  $singleInflModal
    .on('shown.bs.modal', function () {
      updateOffsets();
      jQuery(this)
        .scrollspy({
          target: '#singleInfluencerNav',
          offset: getFixedNavHeight()
        });
    })
    .on('scroll', function (e) {

      const $target = jQuery(this);

      if ($target.scrollTop() > $fixedNavHeight) {
        $fixedNav.addClass('down');
      }
      else {
        $fixedNav.removeClass('down');
      }
    });
  jQuery(document)
    .on('click', 'a.nav-link[href^="#"]', function (e) {
      e.preventDefault();
      const $target = jQuery(jQuery(this)
        .attr('href'));

      $singleInflModal.animate({
        'scrollTop': $target.position().top
      }, 600, 'easeNav');
    })
    .on('mouseup', '.search-filter--ul [data-toggle=dropdown]', function (e) {
      if ($(e.target)
        .is('i')) {
        $(e.target)
          .closest('button')
          .removeClass('active')
          .find('span')
          .text('');
        $(e.target)
          .closest('button')
          .dropdown('toggle');
      }
    })
    .on('mouseup', '.filter-open .dropdown-menu.show', function (e) {

      jQuery(e.target)
        .not('button')
        .closest('.dropdown.show')
        .one('hide.bs.dropdown', function (ev) {
          ev.preventDefault();
        });
    })
    .on('hide.bs.dropdown', '.keepDropdownOpen .dropdown.show', function (e) {
      e.preventDefault();
    })
    .on('click', '.single-card--infobtn', function (e) {
      let _profile = jQuery(e.currentTarget)
          .parents('.single-profile--card'),
        _slider = _profile.find('.owl-carousel');

      _slider.trigger('to.owl.carousel', _slider.data('owl.carousel')._items.length - 1);
    });

  jQuery('.search-filter--ul .dropdown')
    .on('shown.bs.dropdown', function () {
      jQuery('body')
        .addClass('filter-open');
    })
    .on('hidden.bs.dropdown', function () {
      jQuery('body')
        .removeClass('filter-open');
    });

  jQuery('.search-filter--ul [data-toggle="dropdown"]')
    .dropdown({
      boundary: 'window',
      flip: false
    });
  jQuery('.badge-outline--dark')
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


  function owlFix(owl) {
    // console.log(owl);
    let $parentEl = owl.relatedTarget.$element.closest('.single-card--owlwrapper');
    let targetW = Math.trunc(owl.relatedTarget.$element.closest('.single-profile--card')
      .width());

    $parentEl.width(targetW);
  }

  jQuery(window)
    .on('resize orientationchange', function () {
      updateOffsets();
      refreshScrollSpy('.modal-single--influencer');
      jQuery('.owl-carousel')
        .trigger('refresh.owl.carousel');
    })
    .resize();
  jQuery('body')
    .on('click', '.checked-all', function (e) {
      let $checked = jQuery(e.currentTarget)
        .closest('.form-row')
        .find('input:checkbox');
      $checked.not(this)
        .prop('checked', this.checked);
    });

  jQuery('.search-filter--ul .btn-apply')
    .on('click', function (e) {

      e.preventDefault();

      let _query = '',
        _applyButton = jQuery(this),
        _dropdown = _applyButton.closest('.dropdown'),
        _valueButton = _dropdown.find('[data-toggle="dropdown"]'),
        _valueEl = _dropdown.find('.value__el');

      jQuery(this)
        .closest('.dropdown-menu')
        .find('input')
        .each(function (i, el) {
          let _obj = {};
          _obj[el.id] = (function () {
            if (el.type == 'checkbox' || el.type == 'radio') {
              _query += !!el.checked ? Helpers.capitalizeFirstChar(el.id) : '';
            }
            else {
              _query += Helpers.capitalizeFirstChar(el.value) + ' , ';
            }
          })();
        });

      _valueEl.text(_query)
        .end()
        .closest('.dropdown')
        .find('[data-toggle="dropdown"]')
        .addClass('active');
    })
    .closest('.dropdown')
    .find('[data-toggle="dropdown"]')
    .prepend(jQuery('<span class="value__el align-middle"></span>'));


})();
