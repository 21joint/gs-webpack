import './vendor';

export default (function() {
  $(document).ready(function() {

    if (!$('.find-influencer').length) {
      return;
    }

    let $profileCarousel = $('.single-profile--carousel'),
        $profileLikeButton = $('.single-profile--likebtn'),
        $profileInfoButton = $('.single-profile--infobtn'),
        $filterDropdown = $('.search-filter--ul button'),
        $ageSlider = $('.ui-age-slider'),
        $priceSlider = $('.ui-slider-price'),
        $budgetSlider = $('#slider-budget'),
        $fixedNav = $('.single-profile--fixednav'),
        $sectionsWrapper = $('.single-profile--sections'),
        $singleInflModal = $('.modal-single--influencer'),
        $profileTabsNav = $('.find-influencer--navtabs'),
        $fixedNavHeight,
        $sectionsWrapperOffset,
        _searchFilter = document.getElementById('searchFilter'),
        tabsCarousel = function() {

          let $clonedTabsNav = $profileTabsNav.clone();

          $clonedTabsNav.appendTo($profileTabsNav.parent()).
              removeClass('py-3').
              addClass('py-4').
              addClass('owl-carousel d-md-none').
              find('[data-toggle="tab"]').
              each(function(i, el) {
                el.removeAttribute('data-toggle');
              });

          $profileTabsNav.addClass('d-none d-md-flex');

          $clonedTabsNav.owlCarousel({
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
              '<i class="icon-arrow-right-bold"></i>'],
          }).on('translated.owl.carousel', function(e) {
            console.log(e);
            var _targetId = $clonedTabsNav.find('.active.center .nav-link').
                attr('href'),
                $targetTab = $profileTabsNav.find('[data-toggle="tab"][href="' +
                    _targetId + '"]');
            $targetTab.tab('show');
          }).on('click', '.nav-link', function(e) {
            e.preventDefault();
            var $owl = $(e.target).parents('.owl-carousel'),
                $clickedSlide = $(e.target).parents('.owl-item'),
                $currentSlide = $owl.find('.owl-item.active.center'),
                direction;

            if (($clickedSlide.index() - $currentSlide.index()) < 0) {
              direction = 'prev.owl.carousel';
            }
            else {
              direction = 'next.owl.carousel';
            }

            $owl.trigger(direction);
          });

          $('.find-influencer--navtabs [data-toggle="tab"]').
              on('show.bs.tab', function(e) {

                $profileCarousel.trigger('destroy.owl.carousel');

                var $target = $(e.currentTarget),
                    $targetHref = $target.attr('href');

                setTimeout(function() {
                  $($targetHref).find('.owl-carousel').owlCarousel({
                    nav: true,
                    dots: false,
                    items: 1,
                    navText: [
                      '<i class="icon-arrow-left-bold"></i>',
                      '<i class="icon-arrow-right-bold"></i>'],
                  });
                });

              });
        },
        updateOffsets = function() {
          $fixedNavHeight = $fixedNav.outerHeight();
          $sectionsWrapperOffset = $sectionsWrapper.position().top;
          refreshScrollSpy('.modal-single--influencer');
        },
        getFixedNavHeight = function() {
          $fixedNavHeight = $fixedNav.outerHeight();
          return $fixedNavHeight;
        },
        likeProfileToggle = function(profile, callback) {
          //dummy function to make ajax call to like profile
          console.warn('TODO: make ajax call to like profile', console);

          if (profile.hasClass('in-likes')) {

            profile.removeClass('in-likes');
          }
          else {
            profile.addClass('in-likes');
          }

          if (typeof callback === 'function')
            callback();
        },
        refreshScrollSpy = function(element) {
          let cacheScrolltop = $(element).scrollTop();
          $(element).scrollTop(0).scrollspy('refresh').scrollTop(cacheScrolltop);
        };

    $.extend($.easing, {
      easeNav: function(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      },
    });

    // createRange($ageSlider, {
    //     range: true,
    //     min: options.min,
    //     max: options.max,
    //     values: [18, 28],
    //     slide: function (event, ui) {
    //         $(this).parent().find('.ui-age-value').val(ui.values[0] + " - " + ui.values[1] + "years ");
    //     }
    // });

    // $filterDropdown.dropdown({
    //   boundary: 'viewport',
    // });

    // $ageSlider.slider({
    //   range: true,
    //   min: 18,
    //   max: 65,
    //   values: [18, 28],
    //   slide: function(event, ui) {
    //     $(this).
    //         parent().
    //         find('.ui-age-value').
    //         val(ui.values[0] + ' - ' + ui.values[1] + '+ years ');
    //   },
    // }).draggable();

    // $filterDropdown.dropdown({
    //   boundary: 'viewport',
    // });

    // $priceSlider.slider({
    //   range: true,
    //   min: 0,
    //   max: 2000,
    //   values: [50, 500],
    //   step: 50,
    //   slide: function(event, ui) {
    //     $(this).
    //         parent().
    //         find('input').
    //         val('$ ' + ui.values[0] + '-' + ui.values[1]);
    //   },
    // }).draggable();

    // $priceSlider.parent().
    //     find('input').
    //     val('$' + $priceSlider.slider('values', 0) + '-' +
    //         $priceSlider.slider('values', 1));

    // $budgetSlider.slider({
    //   min: 0,
    //   max: 1500,
    //   value: 500,
    //   orientation: 'horizontal',
    //   range: 'min',
    //   animate: true,
    //   slide: function(event, ui) {
    //     $('#budget').val('$' + ui.value);
    //   },
    // }).draggable();

    // $('#budget').val('$' + $budgetSlider.slider('value')).draggable();

    // $('.badge-single--profile').tooltip({});

    $profileLikeButton.on('click', function() {
      let _self = $(this),
          _profile = _self.parents('.single-profile--box');

      likeProfileToggle(_profile);
    });

    $singleInflModal.on('shown.bs.modal', function() {
      updateOffsets();
      $(this).scrollspy({
        target: '#singleInfluencerNav',
        offset: getFixedNavHeight(),
      });
    }).on('scroll', function(e) {

      var $target = $(this);

      console.log($target.scrollTop());

      if ($target.scrollTop() > $fixedNavHeight) {
        $fixedNav.addClass('down');
      }
      else {
        $fixedNav.removeClass('down');
      }
    });

    $('body').on('click', 'a[href^="#"]', function(e) {

      e.preventDefault();
      let $target = $($(this).attr('href'));

      console.log($target);

      $singleInflModal.animate({
        'scrollTop': $target.position().top,
      }, 700, 'easeNav');
    }).on('click', '.search-filter--ul .dropdown-menu', function(e) {
      if (!$(e.target).is('.btn-cancel') &&
          $(e.target).parents('.dropdown-menu').length > 0) {
        e.stopPropagation();
      }
    }).on('click', '.single-profile--infobtn', function(e) {
      let _profile = $(e.currentTarget).parents('.single-profile--box'),
          _slider = _profile.find('.owl-carousel');
      _slider.trigger('to.owl.carousel', _slider.data(
          'owl.carousel')._items.length - 1);
    });

    $('.search-filter--ul .dropdown').on('shown.bs.dropdown', function(e) {
      $('body').addClass('filter-open');
    }).on('hidden.bs.dropdown', function(e) {
      $('body').removeClass('filter-open');
    });

    $profileCarousel.owlCarousel({
      loop: true,
      nav: true,
      items: 1,
      navText: [
        '<i class="icon-arrow-left-bold"></i>',
        '<i class="icon-arrow-right-bold"></i>'],
    });
    tabsCarousel();

    $('.single-profile--networks li').on('mouseenter', function() {

      let _self = $(this);
      if (_self.hasClass('is-showing')) {
        return false;
      }
      _self.addClass('is-showing');

      setTimeout(function() {
        _self.removeClass('is-showing');
      }, 1000);

    });

    $(window).on('resize orientationchange', function() {
      updateOffsets();
      refreshScrollSpy('.modal-single--influencer');
    }).resize();

  });
})();