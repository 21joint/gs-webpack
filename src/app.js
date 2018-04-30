/**
 * Application entry point
 */
import './assets/styles/index.scss';
import 'owl.carousel/dist/owl.carousel.min';
import 'select2/dist/js/select2.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './scripts/brand-find-influencer';
import './partials/header/header';
import './partials/loader';
import SelectCountry from './partials/select2.country';



// Adding a cool transition
$.extend($.easing, {
  easeNav(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
  }
});

$('select')
  .select2({
    minimumResultsForSearch: -1,
    templateResult: $(this)
      .hasClass('with-flags') ? SelectCountry : undefined,
    templateSelection: $(this)
      .hasClass('with-flags') ? SelectCountry : undefined
  });
