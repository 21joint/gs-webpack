import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

export default (() => {

  $('.gs-range--slider')
    .each(function (i, el) {
      let _options,
        _instance,
        _parent;

      const hasPrefix = () => el.dataset.prefix ? el.dataset.prefix : '';

      const hasSuffix = () => el.dataset.suffix ? el.dataset.suffix : '';

      const hasCurrency = () => el.dataset.currency ? el.dataset.currency : '';

      _parent = el.closest('.form-group') || el.closest('.form-row');
      _options = {
        start: el.dataset.start.split(','),
        step: parseInt(el.dataset.step, 10),
        connect: !!el.dataset.connect,
        range: {
          'min': parseInt(el.dataset.min.replace(/[^\d.]/g, '')),
          'max': parseInt(el.dataset.max.replace(/[^\d.]/g, ''))
        },
        format: wNumb({
          decimals: 0,
          edit: function (val) {
            return hasPrefix() + hasCurrency() + val + hasSuffix();
          }
        })
      };

      _instance = noUiSlider.create(el, _options);
      _instance.on('update', function (values, handle) {
        let edge = handle == 0 ? 'min' : 'max';
        let _rangeChanged = new Event('rangeChanged');
        _parent.querySelector('input[data-handle="' + handle + '"]').value = (function () {
          return el.dataset.max.indexOf(values[handle]) > -1 ? el.dataset.max : (el.dataset.min.indexOf(values[handle]) >
          -1 ? el.dataset.min : values[handle]);
        })();
        _parent.querySelector('input[data-handle="' + handle + '"]')
          .dispatchEvent(_rangeChanged, { bubbles: true });

      });

      _instance.on('start', function () {
        document.body.classList.add('keepDropdownOpen');
      });
      _instance.on('end', function () {
        setTimeout(function () {
          document.body.classList.remove('keepDropdownOpen');
        }, 200);
      });

      el.parentNode.querySelectorAll('input[data-handle]')
        .forEach(function (_el) {
          _el.addEventListener('change', function (e) {
            let _handle,
              _values;
            _handle = e.target.dataset.handle;
            _values = [null, null];
            _values[_handle] = Math.round(parseInt(e.target.value, 10));
            el.noUiSlider.set(_values);
          });
        });

    });
})();
