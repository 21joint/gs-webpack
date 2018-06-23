import noUiSlider from 'nouislider';
import wNumb from 'wnumb';

export default (evt => {

  $('.gs-range--slider')
    .each(function (i, el) {
      let _options,
        _instance,
        _parent;

      const hasPrefix = () => el.dataset.prefix ? el.dataset.prefix : '';

      const hasSuffix = () => el.dataset.suffix ? el.dataset.suffix : '';

      _parent = el.closest('.form-row');
      _options = {
        start: el.dataset.start.split(','),
        step: parseInt(el.dataset.step, 10),
        connect: !!el.dataset.connect,
        range: {
          'min': parseInt(el.dataset.min.replace(/[^0-9\.]+/g, '')),
          'max': parseInt(el.dataset.max.replace(/[^0-9\.]+/g, ''))
        },
        format: (function () {
          let wnOptions = {
            decimals: el.dataset.decimals || 0,
            thousand: el.dataset.thousand || undefined,
            edit: function (val) {
              return hasPrefix() + (parseInt(val) == parseInt(el.dataset.max) ? Math.round(val) : val) + hasSuffix();
            }
          };
          return wNumb(wnOptions);
        })()
      };

      _instance = noUiSlider.create(el, _options);
      _instance.on('update', function (values, handle) {
        let edge;
        edge = handle === 1 ? 'max' : 'min';

        const zeroParser = function (value) {
          // console.log(parseFloat(value));
          return parseInt(value) !== 0 ? value : parseFloat(value);
        };

        let _rangeChanged = new Event('rangeChanged');
        _parent.querySelector('input[data-handle="' + handle + '"]').value = (function () {

          if (!(el.dataset[edge]).match(/[^0-9\.]+/g)) {
            return zeroParser(values[handle]);
          }
          return el.dataset.max.indexOf(values[handle]) > -1 ? zeroParser(el.dataset.max) : (el.dataset.min.indexOf(values[handle]) >
          -1 ? el.dataset.min : zeroParser(values[handle]));

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

      _parent.querySelectorAll('input[data-handle]')
        .forEach(function (_el) {
          _el.addEventListener('change', function (e) {
            let _handle,
              _values;
            _handle = e.target.dataset.handle;
            _values = [null, null];
            _values[_handle] = parseInt(e.target.value, 10);
            el.noUiSlider.set(_values);
          });
        });

    });
})();
