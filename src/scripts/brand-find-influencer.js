import '../partials/range-sliders';
import '../partials/filters/filters';
import '../partials/input.tags';
import '../partials/owl-bootstrap-tabs/owl.bootstrap.tabs';


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
    .on('click', '.single-influencer--archive', function () {
      let _self = jQuery(this),
        _profile = _self.closest('[class^="col-"]');

      _profile.addClass('zoomingOut').delay(500).queue(function (next) {
        jQuery(this).remove();
        next()
      })


    })
    .on('click', '.dropdown-menu.show', function (e) {
      !e.target.dataset.dismiss && e.stopPropagation();
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

  jQuery("select[name='languages']").on('change', function (e) {
    // console.log(jQuery(e.target).val());
  });
})();
