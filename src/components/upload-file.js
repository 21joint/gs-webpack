export default (function() {

  let dndHover;

  dndHover = function(options) {

    return this.each(function() {

      let self = $(this);
      let collection = $();
      self.on('dragenter', function(event) {
        if (collection.length === 0) {
          self.trigger('dndHoverStart');
        }
        collection = collection.add(event.target);
      });

      self.on('dragleave', function(event) {
        /*
         * Firefox 3.6 fires the dragleave event on the previous element
         * before firing dragenter on the next one so we introduce a delay
         */
        setTimeout(function() {
          collection = collection.not(event.target);
          if (collection.length === 0) {
            self.trigger('dndHoverEnd');
          }
        }, 1);
      });
    });
  };

  $.fn.dndhover = dndHover;

  $('.dnd-drop--area').dndhover().on({
    'dndHoverStart': function(event) {

      event.stopPropagation();
      event.preventDefault();

      $('body').addClass('dnd-on--area');
      $(event.target).addClass('dnd-area--active');

      return false;
    },
    'dndHoverEnd': function(event) {

      event.stopPropagation();
      event.preventDefault();

      $('body').removeClass('dnd-on--area');
      $(event.target).removeClass('dnd-area--active');

      return false;
    },
  });

  return dndHover;

})();