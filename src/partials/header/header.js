export default (() => {
  jQuery(document)
    .on('click', '.navbar_toggler', () => {
      $('body')
        .toggleClass('menu_open');
    });
})();



$('#menu-toggle input#mt').on("click", preventScroll);
function preventScroll() {
    $('body').toggleClass('menu-open');
    $('body').removeClass('languages-open');
}

$('nav ul li a:not(.lang)').on("click", closeMenu);
function closeMenu() {
    $('body').removeClass('menu-open');
    $('body').removeClass('languages-open');
}


$('.language-switcher a').on("click", addClass);
function addClass() {
    $('body').toggleClass('languages-open');

}