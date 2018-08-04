const Filters = (() => {
  let filters = [];

  jQuery('#searchForm')
    .on('submit', function (e) {
      e.preventDefault();
    });


  jQuery('select')
    .on('select2:unselect', function (e) {

      if (!e.params.originalEvent) {
        return;
      }
      e.params.originalEvent.stopPropagation();
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
            _valueEl = _dropdown.find('.value__el'),
            _checkedCount = _dropdown.find('[data-use]:checked').length;

          _dropdown
            .find('[data-use]')
            .each(function (j, el) {
              if (el.dataset.use.match(/value/)) {
                if (jQuery.isArray(jQuery(el)
                  .val())) {
                  jQuery(jQuery(el)
                    .val())
                    .each(function (h, v) {
                      _query += el.dataset.use.replace(jQuery(el).val().length  === h + 1 ? /value,/ : /value/, v);
                    });
                }
                else {
                  _query += el.dataset.use.replace(/value/, el.value);
                }
              }
              if (el.checked && el.dataset.use.match(/label/)) {
                _query += el.dataset.use.replace(_checkedCount === j + 1 ? /label,/ : /label/,
                  el.parentNode.querySelector('label').innerText || el.parentNode.parentNode.querySelector('label').innerText);
              }
              if (el.checked && el.dataset.use.match(/name/)) {
                _query += el.dataset.use.replace(_checkedCount === j + 1 ? /name,/ : /name/, el.getAttribute('name'));
              }
            });

          _valueEl.text(_query)
            .end()
            .closest('.dropdown')
            .find('[data-toggle="dropdown"]')
            .addClass('active');

        });
      filters.push(_filter);
    });


  jQuery('.search-filter--ul [data-toggle="dropdown"]')
    .on('click', 'i', (e) => {
      jQuery(e.target)
        .closest('button')
        .removeClass('active')
        .find('span')
        .text('');
      jQuery(e.target)
        .closest('button')
        .dropdown('toggle');
    })
    .dropdown({
      boundary: 'window',
      flip: false
    });
  jQuery('.btn-clear')
    .on('click', (e) => {
      jQuery('.search-filter--ul [data-toggle="dropdown"]')
        .removeClass('active')
        .find('span')
        .text('');

    });


})();


export default Filters;
