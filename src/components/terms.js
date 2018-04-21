'use strict';

(function () {
  let countCheck = function () {
    return $('.agree_checkbox:checked').length;
  };

  $('.agree_checkbox')
    .on('change', function () {

      let a = countCheck();
      if (a === 4) {
        $('.btn-agree')
          .prop('disabled', false);
      }
      else {
        $('.btn-agree')
          .prop('disabled', true);
      }
    });

})();
