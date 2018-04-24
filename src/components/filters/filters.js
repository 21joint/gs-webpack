import jQuery from 'jquery';
import DATA from './data';

/**
 * --------------------------------------------------------------------------
 * BS filters (v0.0.1): filters.js
 * --------------------------------------------------------------------------
 */

const SearchFilters = (() => {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  const NAME = 'bsSearchFilters';
  const DATA_KEY = 'bs.search.filters';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const JQUERY_NO_CONFLICT = jQuery.fn[NAME];
  const TEMPLATE = {
    BUTTON: `<button data-apply="filter"
        type="button"
        class="btn btn-sm btn-outline-primary"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        aria-checked="false"></button>`,
    DROPDOWN: `<div class="dropdown-menu p-0">
  <div class="position-relative">
    <div class="container-fluid">
      <div class="row py-3 flex-sm-column">
        <div class="col-12">
          <h6 class="text-dark mb-3"><strong>Gender</strong></h6>
        </div>
        <div class="col-12">
          <p class="mb-0">The demographics data is not 100% correct <br> <a href="#">(read more)</a></p>
        </div>
      </div>
      <div class="row py-3 justify-content-center flex-sm-column">
        <div class="col-auto">
          <div class="form-group mb-3">
            <input type="checkbox" name="men" id="men"><label for="men"><span class="box"></span>Men</label>
          </div>
        </div>
        <div class="col-auto">
          <div class="form-group mb-3">
            <input type="checkbox" name="women" id="women"><label for="women"> <span class="box"></span>Women</label>
          </div>
        </div>
        <div class="col-auto">
          <div class="form-group mb-0">
            <input type="checkbox" name="unknown" id="unknown">
            <label for="unknown"><span class="box"></span>Unknown</label>
          </div>
        </div>
      </div>
      <div class="row pt-3 pb-4">
        <div class="col-sm-5 col-md pb-5 py-md-0">
          <div class="gs-sliderrange-wrapper">
            <div class="form-group">
              <div class="mb-4">
                <label class="label-basic text-dark d-block">Age</label><input title="gs-handle--input"
                                                                               type="text"
                                                                               class="form-control d-inline"
                                                                               data-handle="0"/><span class="text-asphalt mx-1">-</span>
                <input title="gs-handle--input" type="text" class="form-control d-inline" data-handle="1"/>
                <span class="text-asphalt ml-1">years</span>
              </div>
              <div id="sliderAge"
                   class="gs-range--slider"
                   data-start="13, 25"
                   data-min="13"
                   data-max="65"
                   data-step="1"
                   data-connect="true"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row py-3 justify-content-between dropdown-menu--actions">
        <div class="col-auto">
          <button type="button" class="btn btn-block btn-sm btn-cancel">Cancel</button>
        </div>
        <div class="col-auto">
          <button type="button"
                  class="btn btn-block btn-primary btn-sm btn-apply"
                  aria-describedby="sliderAge"
                  aria-controls="filters">Apply</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
  };

  const ClassName = {
    BUTTON: 'btn btn-sm btn-outline-primary',
    ACTIVE: 'applied',
    FOCUS: 'focus'
  };

  const Selector = {
    BUTTON: '[data-apply="filter"]',
    DROPDOWN: '.dropdown-menu'
  };

  const Event = {
    CLICK_DATA_API: `click${EVENT_KEY}${DATA_API_KEY}`,
    FOCUS_BLUR_DATA_API: `focus${EVENT_KEY}${DATA_API_KEY} ` +
    `blur${EVENT_KEY}${DATA_API_KEY}`
  };

  const DEFAULTS = {
    button: Selector.BUTTON,
    dropdown: Selector.DROPDOWN
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  class SearchFilters {
    // Public
    constructor(element) {
      this._element = element;
    }

    // Getters
    static get VERSION() {
      return VERSION;
    }

    // Static
    static __extendJquery(config) {
      let data = jQuery(this).data(DATA_KEY);

      if (!data) {
        data = new SearchFilters(this);
        jQuery(this).data(DATA_KEY, data);
      }
      if (config) {
        data.render(config);
      }
      data.render();
    }

    static createInputs(options) {
      let _res = '';
      jQuery(options).each(function (i, option) {
        const _tStamp = new Date().getTime();
        if (option.type == 'checkbox') {
          _res += `<div class="form-group"><label class="mb-0" title="${option.label}">${option.label}<span class="box"></span></label></div>`;

          jQuery.each(option.values, (index, val) => {
            let _label = `<label for="${val}__${index}">${val}<span class="box"></span></label>`;
            let _input = `<input type="checkbox" class="form-control" id="${val}__${index}" name="${option.name}"  value="${val}" />`;
            _res += `<div class="form-group">${_input + _label}</div>`;
          });

        }
        if (option.type == 'range') {

        }
      });
      console.log(_res);
      return _res;
    }

    static generateTemplate(filter) {
      const _tStamp = new Date().getTime();
      let _btn, _dropdown, _self = this;


      _btn = jQuery(`<button 
        ${Selector.BUTTON}
        id="${ClassName.BUTTON}__${ _tStamp}"
        aria="filter"
        type="button"
        class="${ClassName.BUTTON}"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        aria-checked="false">${filter.name}</button>`);

      // language=HTML
      _dropdown = jQuery(`<div class="dropdown-menu p-0">
                            <div class="position-relative">
                            <div class="container-fluid">
                              <div class="row pt-3 flex-sm-column">
                                <div class="col col-12">
                                    <h6 class="text-dark mb-3"><strong>${filter.name}</strong></h6>
                                     ${!!filter.description ? `<p> ${filter.description}<br /><a href="#">see more</a></p>` : '' }
                                </div>
                                <div class="col col-12">${ this.createInputs(filter.options) }</div>
                              </div>
                              <div class="row py-3 justify-content-between dropdown-menu--actions">
                                  <div class="col-auto">
                                    <button data-dismiss="dropdown" type="button" class="btn btn-block btn-sm btn-cancel">Cancel</button>
                                  </div>
                                  <div class="col-auto">
                                    <button type="button"
                                            class="btn btn-block btn-primary btn-sm btn-apply"
                                            aria-describedby="sliderAge"
                                            aria-controls="filters">Apply</button>
                                  </div>
                              </div>
                              </div>
                            </div>
                          </div>`);

      return jQuery(`<li class="dropdown"></li>`).append(_btn).append(_dropdown);
    }


    render() {
      const _el = this._element;
      jQuery.each(DATA, function (i, f) {
        _el.append(SearchFilters.generateTemplate(f));
      });
    }
  }

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  jQuery(document).on('ready', () => {
    SearchFilters.__extendJquery.call(this._element);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  jQuery.fn[NAME] = SearchFilters.__extendJquery;
  jQuery.fn[NAME].Constructor = SearchFilters;
  jQuery.fn[NAME].noConflict = function () {
    jQuery.fn[NAME] = JQUERY_NO_CONFLICT;
    return SearchFilters.__extendJquery;
  };

  return SearchFilters;
})();

export default SearchFilters;
