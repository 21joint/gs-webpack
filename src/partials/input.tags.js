const InputTags = (() => {

  jQuery('input[data-tags]')
    .each(function (i, el) {

      const _uToken = Math.random()
        .toString(36)
        .substr(2, 9);
      const _$input = jQuery(el);
      const _$container = _$input.closest(`div:has([data-submit]):has([data-tags])`);
      const _$submitBtn = _$container.find('[data-submit]');
      const _$tagsContainer = jQuery(
        `<ul class="row no-gutters input-tags--container" aria-labelledby="inputTags_${_uToken}"></ul>`);
      const _$addTag = function (e) {
        if (!_$input.val()) {
          return;
        }
        jQuery(`<li class="col-auto d-flex align-items-center m-2">
                    <span class="input-tag--value">${_$input.val()}</span>
                    <button class="input-tag--remove ml-2" type="button" aria-controls="inputTags_${_uToken}"> <i class="icon-plus"></i> </button>
                </li>`)
          .appendTo(_$tagsContainer)
          .find('button')
          .on('click', function (e) {
            e.currentTarget.parentNode.remove();
            e.stopPropagation();
          });
        _$input.val('');
        jQuery('[data-toggle="dropdown"][aria-expanded="true"]')
          .dropdown('update');
      };

      jQuery(document)
        .on('keydown', function (event) {
          if (event.which == 13) {
            event.preventDefault();
            event.stopPropagation();
            _$addTag(event);
          }
        });

      _$tagsContainer.appendTo(_$container)
        .wrap(jQuery('<div class="col-12"></div>'));

      _$input.attr(`id`, `inputTags_${_uToken}`);

      _$submitBtn.on(`click`, _$addTag);

    });

})();
