export default function(tabsElem) {

  let $clonedTabsNav = $(tabsElem).clone();

  $clonedTabsNav.appendTo($(tabsElem).parent()).
      removeClass('py-3').
      addClass('py-4').
      addClass('owl-carousel d-md-none').
      find('[data-toggle="tab"]').
      each(function(i, el) {
        el.removeAttribute('data-toggle');
      });

  $(tabsElem).addClass('d-none d-md-flex');

  $clonedTabsNav.owlCarousel({
    autoWidth: true,
    center: true,
    dots: false,
    loop: true,
    margin: 20,
    navSpeed: 400,
    dragSpeed: 400,
    nav: true,
    navText: [
      '<i class="icon-arrow-left-bold"></i>',
      '<i class="icon-arrow-right-bold"></i>'],
  }).on('translated.owl.carousel', function(e) {
    console.log(e);
    const _targetId = $clonedTabsNav.find('.active.center .nav-link').
        attr('href'),
        $targetTab = $(tabsElem).find('[data-toggle="tab"][href="' +
            _targetId + '"]');
    $targetTab.tab('show');
  }).on('click', '.nav-link', function(e) {
    e.preventDefault();
    let $owl = $(e.target).parents('.owl-carousel'),
        $clickedSlide = $(e.target).parents('.owl-item'),
        $currentSlide = $owl.find('.owl-item.active.center'),
        direction;

    if (($clickedSlide.index() - $currentSlide.index()) < 0) {
      direction = 'prev.owl.carousel';
    }
    else {
      direction = 'next.owl.carousel';
    }

    $owl.trigger(direction);
  });

  $('.find-influencer--navtabs [data-toggle="tab"]').
      on('show.bs.tab', function(e) {

        $(tabsElem).trigger('destroy.owl.carousel');

        const $target = $(e.currentTarget),
            $targetHref = $target.attr('href');

        setTimeout(function() {
          $($targetHref).find('.owl-carousel').owlCarousel({
            nav: true,
            dots: false,
            items: 1,
            navText: [
              '<i class="icon-arrow-left-bold"></i>',
              '<i class="icon-arrow-right-bold"></i>'],
          });
        });

      });
}