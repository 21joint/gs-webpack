import '../partials/owl-bootstrap-tabs/owl.bootstrap.tabs';
import '../partials/range-sliders';


(!!document.querySelector('.find-influencer')) && (function () {

  let $fixedNavHeight,
    $sectionsWrapperOffset;

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
    .on('shown.bs.modal', '.modal-single--influencer', function () {
      updateOffsets(jQuery(this));
    })
    .on('hide.bs.dropdown', '.keepDropdownOpen .dropdown.show', function (e) {
      e.preventDefault();
    })
    // .on('shown.bs.dropdown', '.dropdown', function (e) {
    //   console.log(e);
    //   jQuery(e.target)
    //     .find('.nav-item:first-child .nav-link')
    //     .addClass('active');
    // })
    .on('shown.bs.tab', function (e) {
      jQuery(jQuery(e.target)
        .attr('href') + ' .owl-carousel')
        .resize();
    })
    .on('click', '.dropdown-menu.show [data-toggle="tab"]', function (e) {
      e.stopPropagation();

    })
    .on('click', 'a.nav-link[href^="#"]', function (e) {
      e.preventDefault();
      const $target = jQuery(jQuery(this)
        .attr('href'));

      $singleInflModal.animate({
        'scrollTop': $target.position().top - $fixedNavHeight + 2
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
    .on('mouseup', '.search-filter--ul [data-toggle=dropdown]', function (e) {
      if (jQuery(e.target)
        .is('i')) {
        jQuery(e.target)
          .closest('button')
          .removeClass('active')
          .find('span')
          .text('');
        jQuery(e.target)
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
      boundary: 'viewport',
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

  jQuery(window)
    .on('resize orientationchange', function () {
      updateOffsets();
      refreshScrollSpy('.modal-open .modal-single--influencer');
      jQuery('.owl-carousel')
        .trigger('refresh.owl.carousel');
    });
  jQuery('body')
    .on('click', '.checked-all', function (e) {
      let $checked = jQuery(e.currentTarget)
        .closest('.form-row' || 'form-group')
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
        .find('[data-use]')
        .each(function (i, el) {
          if (el.dataset.use.match(/value/)) {
            _query += el.dataset.use.replace(/value/, el.value);
          }
          if (el.checked && el.dataset.use.match(/label/)) {
            _query += el.dataset.use.replace(/label/, el.parentNode.querySelector('label').innerText ||
              el.parentNode.parentNode.querySelector('label').innerText);
          }
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

  jQuery(window)
    .resize();

  function owlFix(owl) {
    const $parentEl = owl.relatedTarget.$element.closest('.single-card--owlwrapper');
    const targetW = Math.trunc(owl.relatedTarget.$element.closest('.single-profile--card')
      .width());

    $parentEl.width(targetW);
  }
})();
