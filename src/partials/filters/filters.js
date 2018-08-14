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
    // Save filters for each filter
    .each(function (i, el) {
      let _filter = {};

      _filter.id = 'searchFilter' + i + '__' + new Date().getTime();
      _filter.$el = jQuery(el);
      _filter.$el.attr('id', _filter.id);
      _filter.$inputs = _filter.$el.find('input');
      _filter.$toggler = _filter.$el.find('[data-toggle="dropdown"]');
      _filter.$valueEl = jQuery('<span class="value__el align-middle"></span>');
      _filter.$toggler.append(_filter.$valueEl);
      _filter.$applyBtn = _filter.$el.find('.btn-apply');

      _filter.$el
        .find('[data-use]');

      _filter.$applyBtn
        .on('click', function (e) {
          e.preventDefault();
          let _query = '';

          _filter.$el
            .find('[data-use]')
            .each(function (j, el) {
              if (el.getAttribute('type') == 'checkbox' || el.getAttribute('type') == 'radio') {
                console.info('type: checkbox');
                if (el.checked && el.dataset.use.match(/label/)) {
                  console.info('using as filter badge text:', 'label');
                  _query += el.dataset.use.replace(/label/,
                    el.parentNode.querySelector('label').innerText || el.parentNode.parentNode.querySelector('label').innerText);
                }
                if (el.checked && el.dataset.use.match(/name/)) {
                  console.info('using as filter badge text:', 'name');
                  _query += el.dataset.use.replace(/name/, el.getAttribute('name'));
                }
              }
              if (el.dataset.use.match(/value/)) {
                console.info('using as filter badge text:', 'value');
                if (jQuery.isArray(jQuery(el)
                  .val())) {
                  jQuery(jQuery(el)
                    .val())
                    .each(function (h, v) {
                      _query += el.dataset.use.replace(/value/, v);
                    });
                }
                else {
                  _query += el.dataset.use.replace(/value/, el.value);
                }
              }
            });
          _filter.$valueEl.text(_query.replace(/,\s*$/, ''));

          _filter.$toggler
            .addClass(_filter.$valueEl.text().length > 0 ? 'active' : '');
          _filter.$toggler.is('.active') && !_filter.$valueEl.text().length && _filter.$toggler.removeClass('active');

        });
      filters.push(_filter);
    });

  console.log(filters);
  jQuery('.search-filter--ul [data-toggle="dropdown"]')
    .on('click', '.icon-close', (e) => {
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
    jQuery('[title=gs-handle--input]')
    .on('keyup', (e) => {

       if(e.keyCode == 38){
        e.target.value++
       }
       if(e.keyCode == 40){
       e.target.value--
       }
    });
})();

export default Filters;
