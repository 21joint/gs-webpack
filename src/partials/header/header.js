export default (() => {
  jQuery(document)
    .on('click', '.navbar_toggler', () => {
      $('body')
        .toggleClass('menu_open');
    });
  jQuery('#notificationsTabs')
    .dropdown();
})();
