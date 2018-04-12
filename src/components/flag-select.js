export class FlagSelect {
  constructor() {
    init('select.with-flags', function(opt) {
      let optimage, $opt;
      if (!opt.id) {
        return opt.text;
      }
      optimage = $(opt.element).data('image');
      if (!optimage) {
        return opt.text;
      } else {

        $opt = $(
            '<span class="countryName"><span class="countryFlag"><img class="rounded-circle mw-100" src="' +
            optimage + '" class="userPic" /></span> ' + $(opt.element).text() +
            '</span>',
        );
        return $opt;
      }
    });
  }

  init = function(selector, renderTemplate) {
    $(selector).select2({
      minimumResultsForSearch: -1,
      templateResult: renderTemplate,
      templateSelection: renderTemplate,
    });
  };

}