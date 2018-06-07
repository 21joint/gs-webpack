import jQuery from 'jquery';
import 'owl.carousel';

const OwlTabs = (() => {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'owlTabs';
  const VERSION = '0.0.1';
  const DATA_KEY = 'owl.tabs';

  /**
   * ------------------------------------------------------------------------
   * Default Options
   * ------------------------------------------------------------------------
   */
  const DEFAULTS = {
    autoWidth: true,
    center: true,
    dots: false,
    loop: true,
    margin: 20,
    nav: true
  };

  // Selector
  const Selector = {
    TAB_BUTTON: '[data-toggle="tab"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };


  const EVENTS = {
    READY_STATE: 'ready'
  };


  const JQUERY_NO_CONFLICT = jQuery.fn[NAME];

  class OwlTabs {

    constructor(element) {
      this._element = element;
    };

    // Getters
    static get VERSION() {
      return VERSION;
    }

    // Static
    static __extendJquery(config) {
      let data = jQuery(this)
        .data(DATA_KEY);

      if (!data) {
        data = new OwlTabs(this);
        jQuery(this)
          .data(DATA_KEY, data);
      }
      if (config) {
        data.init(config);
      }
    }

    init(options) {
      const _options = jQuery.extend({}, DEFAULTS, options);
      const _element = this._element;
      let _clonedTabs = this._element.clone();
      _clonedTabs
        .appendTo(_element.closest('nav')
          .siblings('nav'))
        .addClass('owl-carousel')
        .find(Selector.TAB_BUTTON)
        .each(function (i, el) {
          el.removeAttribute('data-toggle');
        });

      _clonedTabs
        .on('translated.owl.carousel', function () {
          const _targetId = _clonedTabs.find('.active.center .nav-link')
            .attr('href');
          const $targetTab = _element.find('[data-toggle="tab"][href="' +
            _targetId + '"]');
          $targetTab.tab('show')
            .addClass('show');
        })
        .on('click', '.nav-link', function (e) {
          e.preventDefault();
          let direction;
          const $owl = jQuery(e.target)
            .closest('.owl-carousel');
          const $clickedSlide = jQuery(e.target)
            .closest('.owl-item');
          const $currentSlide = $owl.find('.owl-item.active.center');
          if (($clickedSlide.index() - $currentSlide.index()) == 0) {
            return;
          }
          else if (($clickedSlide.index() - $currentSlide.index()) < 0) {
            direction = 'prev.owl.carousel';
          }
          else {
            direction = 'next.owl.carousel';
          }

          $owl.trigger(direction);
        });

      _clonedTabs.owlCarousel(_options)
        .resize();

    }
  }


  jQuery(document)
    .on(EVENTS.READY_STATE, function () {
      OwlTabs.__extendJquery.call(this._element);
    });

  jQuery.fn[NAME] = OwlTabs.__extendJquery;
  jQuery.fn[NAME].Constructor = OwlTabs;
  jQuery.fn[NAME].noConflict = function () {
    jQuery.fn[NAME] = JQUERY_NO_CONFLICT;
    return OwlTabs.__extendJquery;
  };



  return OwlTabs;

})();

export default OwlTabs;
