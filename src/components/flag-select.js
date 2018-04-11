export default {
  init: function() {
    function addCountryFlag(opt) {
      if (!opt.id) {
        return opt.text;
      }
      let optimage = $(opt.element).data('image');
      if (!optimage) {
        return opt.text;
      } else {
        let $opt = $(
            '<span class="countryName"><span class="countryFlag"><img class="rounded-circle mw-100" src="' +
            optimage + '" class="userPic" /></span> ' + $(opt.element).text() +
            '</span>',
        );
        return $opt;
      }
    }

    $('select.with-flags').select2({
      minimumResultsForSearch: -1,
      templateResult: addCountryFlag,
      templateSelection: addCountryFlag,
    });

    $('select.form-control').select2({
      minimumResultsForSearch: -1,
    });
  },
};