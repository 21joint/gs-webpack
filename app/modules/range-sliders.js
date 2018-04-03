import noUiSlider from 'nouislider';
import _ from 'lodash';

export default function() {
  let App;

  App = function() {
    let _self = this;

    _self._instances = [];

    _self.init = function(selector, options) {
      let sliders = document.querySelectorAll(selector);

      _.each(sliders, function(el, i) {
        let _options,
            _slider,
            _start,
            _min,
            _max;
        _start = el.dataset.start.split(',');
        _min = parseInt(el.dataset.min);
        _max = parseInt(el.dataset.max);

        _.each(_start, function(s, i) {
          _start[i] = Number(_start[i]) ?
              _start[i] :
              eval('_' + _start[i].slice(1, _start[i].length - 1));
        });

        _options = _.extend({}, options, {
          connect: true,
          start: _start,
          range: {
            'min': _min,
            'max': _max,
          },
        });

        _slider = noUiSlider.create(el, _options);
       console.log(el, _slider);
        _self._instances.push(_slider);
      });
      console.log(_self._instances);
      return _self;
    };
  };

  return new App();
}