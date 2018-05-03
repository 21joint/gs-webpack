const Filters = (() => {
  let filters = [];

  jQuery('#searchForm')
    .on('submit', function (e) {
      e.preventDefault();
    });

  jQuery('.search-filter--ul .dropdown')
    .on('shown.bs.dropdown', function () {
      jQuery('body')
        .addClass('filter-open');
    })
    .on('hidden.bs.dropdown', function () {
      jQuery('body')
        .removeClass('filter-open');
    })
    .on('mouseup', '[data-toggle=dropdown]', function (e) {
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
    // Save filters for each filter
    .each(function (i, el) {
      let _filter = {};

      _filter.id = 'searchFilter' + i;
      _filter.$el = jQuery(el);
      _filter.$el.attr('id', _filter.id);
      _filter.$inputs = _filter.$el.find('input');
      _filter.$toggler = _filter.$el.find('[data-toggle="dropdown"]');
      _filter.$valueEl = jQuery('<span class="value__el align-middle"></span>');
      _filter.$toggler.append(_filter.$valueEl);
      _filter.$applyBtn = _filter.$el.find('.btn-apply');
      jQuery(document)
        .on('click', '.btn-apply', function (e) {
          e.preventDefault();

          let _query = '',
            _applyButton = jQuery(this),
            _dropdown = _applyButton.closest('.dropdown'),
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

        });
      filters.push(_filter);
      console.log(filters);
    });

  jQuery('.search-filter--ul [data-toggle="dropdown"]')
    .dropdown({
      boundary: document.querySelector('.content-box'),
      flip: false
    });
})();


export default Filters;
