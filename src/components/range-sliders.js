import noUiSlider from 'nouislider';

export default (() => {
  $('.gs-range--slider').each(function (i, el) {
    let _options,
      _instance,
      _parent;

    _parent = el.closest('.form-group');
    _options = {
      start: el.dataset.start.split(','),
      step: parseInt(el.dataset.step, 10),
      connect: !!el.dataset.connect,
      range: {
        'min': parseInt(el.dataset.min, 10),
        'max': parseInt(el.dataset.max, 10)
      },
      format: {
        to: function (value) {
          return Math.round(value)
        },
        from: function (value) {
          return Math.round(value)
        }
      }
    };
    _instance = noUiSlider.create(el, _options);

    _instance.on('update', function (values, handle) {
      _parent.querySelector('input[data-handle="' + handle + '"]').value = values[handle];
    });
    _instance.on('start', function () {
      document.body.classList.add('noUiSliding');
    });
    _instance.on('end', function () {
      setTimeout(function () {
        document.body.classList.remove('noUiSliding');
      }, 200);
    });

    el.parentNode.querySelectorAll('input[data-handle]')
      .forEach(function (_el) {
        console.log(_el);
        _el.addEventListener('input', function (e) {
          let _handle, _values;


          _handle = e.target.dataset.handle;
          _values = [null, null];
          _values[_handle] = Math.round(parseInt(e.target.value, 10));
          el.noUiSlider.set(_values);
        });
      })

  });
})();
