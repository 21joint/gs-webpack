(!!document.querySelector('.find-influencer')) && (function () {

  $.extend($.easing, {
    easeNav: function (t) {
      return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
  });

  let $fixedNavHeight,
    $sectionsWrapperOffset;


  const $profileLikeButton = $('.single-card--likebtn');
  const $fixedNav = $('.single-card--fixednav');
  const $sectionsWrapper = $('.single-card--sections');
  const $singleInflModal = $('.modal-single--influencer');
  const $profileTabsNav = $('.find-influencer--navtabs');
  const tabsCarousel = function () {

    let $clonedTabsNav = $profileTabsNav.clone();

    $clonedTabsNav.appendTo($profileTabsNav.parent())
      .removeClass('py-3')
      .addClass('py-4')
      .addClass('owl-carousel d-md-none')
      .find('[data-toggle="tab"]')
      .each(function (i, el) {
        el.removeAttribute('data-toggle');
      });

    $profileTabsNav.addClass('d-none d-md-flex');

    $clonedTabsNav
      .on('translated.owl.carousel', function (e) {
        const _targetId = $clonedTabsNav.find('.active.center .nav-link')
            .attr('href'),
          $targetTab = $profileTabsNav.find('[data-toggle="tab"][href="' +
            _targetId + '"]');
        $targetTab.tab('show');
      })
      .on('click', '.nav-link', function (e) {
        e.preventDefault();
        let direction;
        const $owl = $(e.target)
          .parents('.owl-carousel');
        const $clickedSlide = $(e.target)
          .parents('.owl-item');
        const $currentSlide = $owl.find('.owl-item.active.center');
        if (($clickedSlide.index() - $currentSlide.index()) < 0) {
          direction = 'prev.owl.carousel';
        }
        else {
          direction = 'next.owl.carousel';
        }

        $owl.trigger(direction);
      })
      .owlCarousel({
        autoWidth: true,
        center: true,
        dots: false,
        loop: true,
        margin: 20,
        navSpeed: 400,
        dragSpeed: 400,
        nav: true,
        navText: [
          '<i class="icon-arrow-left-bold"></i>',
          '<i class="icon-arrow-right-bold"></i>']
      });


    $('.find-influencer--navtabs [data-toggle="tab"]')
      .on('show.bs.tab', function (e) {

        $('.single-card--carousel')
          .trigger('destroy.owl.carousel');

        let $target = $(e.currentTarget),
          $targetHref = $target.attr('href');

        $($targetHref)
          .find('.owl-carousel')
          .owlCarousel({
            nav: true,
            dots: false,
            items: 1,
            navText: [
              '<i class="icon-arrow-left-bold"></i>',
              '<i class="icon-arrow-right-bold"></i>']
          });

      });
  };
  const updateOffsets = function () {
    $fixedNavHeight = $fixedNav.outerHeight();
    $sectionsWrapperOffset = $sectionsWrapper.position().top;
    refreshScrollSpy('.modal-single--influencer');
  };
  const getFixedNavHeight = function () {
    $fixedNavHeight = $fixedNav.outerHeight();
    return $fixedNavHeight;
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
    let cacheScrolltop = $(element)
      .scrollTop();
    $(element)
      .scrollTop(0)
      .scrollspy('refresh')
      .scrollTop(cacheScrolltop);
  };

  $profileLikeButton.on('click', function () {
    let _self = $(this),
      _profile = _self.parents('.single-profile--card');

    likeProfileToggle(_profile);
  });

  $singleInflModal
    .on('shown.bs.modal', function () {
      updateOffsets();
      $(this)
        .scrollspy({
          target: '#singleInfluencerNav',
          offset: getFixedNavHeight()
        });
    })
    .on('scroll', function (e) {

      const $target = $(this);

      console.log($target.scrollTop());

      if ($target.scrollTop() > $fixedNavHeight) {
        $fixedNav.addClass('down');
      }
      else {
        $fixedNav.removeClass('down');
      }
    });

  $('body')
    .on('click', 'a[href^="#"]', function (e) {

      e.preventDefault();
      const $target = $($(this)
        .attr('href'));

      console.log($target);

      $singleInflModal.animate({
        'scrollTop': $target.position().top
      }, 700, 'easeNav');
    })
    .on('click', '.search-filter--ul .dropdown-menu', function (e) {
      if (!$(e.target)
          .is('.btn-cancel') &&
        $(e.target)
          .parents('.dropdown-menu').length > 0) {
        e.stopPropagation();
      }
    })
    .on('click', '.single-card--infobtn', function (e) {
      let _profile = $(e.currentTarget)
          .parents('.single-profile--card'),
        _slider = _profile.find('.owl-carousel');

      _slider.trigger('to.owl.carousel', _slider.data('owl.carousel')._items.length - 1);
    });

  $('.search-filter--ul .dropdown')
    .on('shown.bs.dropdown', function (e) {
      $('body')
        .addClass('filter-open');
    })
    .on('hidden.bs.dropdown', function (e) {
      $('body')
        .removeClass('filter-open');
    });
  $('.badge-outline-dark').tooltip({});

  $('.single-card--carousel')
    .owlCarousel({
      loop: true,
      nav: true,
      items: 1,
      navText: [
        '<i class="icon-arrow-left-bold"></i>',
        '<i class="icon-arrow-right-bold"></i>']
    });
  tabsCarousel();

  $('.single-card--networks li')
    .on('mouseenter', function () {

      const _self = $(this);
      if (_self.hasClass('is-showing')) {
        return false;
      }
      _self.addClass('is-showing');

      setTimeout(function () {
        _self.removeClass('is-showing');
      }, 1000);

    });

  $(window)
    .on('resize orientationchange', function () {
      updateOffsets();
      refreshScrollSpy('.modal-single--influencer');
    })
    .resize();

})();
