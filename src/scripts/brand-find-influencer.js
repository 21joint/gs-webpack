import '../components/loader';
import '../components/owl-bootstrap-tabs/owl.bootstrap.tabs';


(!!document.querySelector('.find-influencer')) && (function () {

  let $fixedNavHeight,
    $sectionsWrapperOffset;

  const $profileLikeButton = $('.single-card--likebtn');
  const $fixedNav = $('.single-card--fixednav');
  const $sectionsWrapper = $('.single-card--sections');
  const $singleInflModal = $('.modal-single--influencer');
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

      // console.log($target.scrollTop());

      if ($target.scrollTop() > $fixedNavHeight) {
        $fixedNav.addClass('down');
      }
      else {
        $fixedNav.removeClass('down');
      }
    });


  $(document)
    .on('click', 'nav a[href^="#"]', function (e) {

      e.preventDefault();
      const $target = $($(this).attr('href'));

      $singleInflModal.animate({
        'scrollTop': $target.position().top
      }, 700, 'easeNav');
    })
    // .on('click', '.dropdown-menu [data-dismiss="dropdown"]', function () {
    //   console.log('asdad')
    //   $(this).closest('.dropdown').trigger('hide.bs.dropdown');
    // })
    .on('hide.bs.dropdown', '.noUiSliding .dropdown.show', function (e) {
      e.preventDefault();
    })
    .on('click', '.filter-open .dropdown-menu.show', function (e) {
      if ($(this).has($(e.target)) && $(e.target).is(':not([data-dismiss="dropdown"])')) {
        $(this).closest('.dropdown').one('hide.bs.dropdown', function (e) {
          e.preventDefault();
        })
      }
    })
    .on('click', '.search-filter--ul [data-toggle="filter"]', function (e) {
      console.log(e.target);
    })
    .on('click', '.single-card--infobtn', function (e) {
      let _profile = $(e.currentTarget)
          .parents('.single-profile--card'),
        _slider = _profile.find('.owl-carousel');

      _slider.trigger('to.owl.carousel', _slider.data('owl.carousel')._items.length - 1);
    });

  $('.search-filter--ul .dropdown')
    .on('shown.bs.dropdown', function () {
      $('body').addClass('filter-open');
    })
    .on('hidden.bs.dropdown', function () {
      $('body').removeClass('filter-open');
    });

  $('.search-filter--ul [data-toggle="dropdown"]').dropdown({
    boundary: $('.content-box').get(0),
    flip: false
  });
  $('.badge-outline--dark').tooltip();

  $('.find-influencer--navtabs').owlTabs({
    navText: [
      '<i class="icon-arrow-left-bold"></i>',
      '<i class="icon-arrow-right-bold"></i>'
    ]
  });

  $('.single-card--carousel').owlCarousel({
    nav: true,
    loop: true,
    items: 1,
    onInitialized: owlFix,
    onRefreshed: owlFix,
    dots: false,
    navText: [
      '<i class="icon-arrow-left-bold"></i>',
      '<i class="icon-arrow-right-bold"></i>'
    ],
  });



  function owlFix(owl) {
    // console.log(owl);
    let $parentEl = owl.relatedTarget.$element.closest('.single-card--owlwrapper');
    let targetW = Math.trunc(owl.relatedTarget.$element.closest('.single-profile--card').width());

    $parentEl.width(targetW);
  }

  $(window).on('resize orientationchange', function () {
    updateOffsets();
    refreshScrollSpy('.modal-single--influencer');
    $('.owl-carousel').trigger('refresh.owl.carousel');
  }).resize();
  $('body').on('click','.checked-all', function (e) {
    let $checked = $(e.currentTarget).closest('.row').find('input:checkbox');
    $checked.not(this).prop('checked', this.checked);
  });

  $('.search-filter--ul .form-group input').on('change', function (e) {
    console.log(e)

  })

})();
