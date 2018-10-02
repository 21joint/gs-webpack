/**
 * Application entry point
 */
import './assets/icomoon/style.scss';
import './assets/styles/index.scss';
import 'owl.carousel/dist/owl.carousel.min';
import 'select2/dist/js/select2.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './scripts/brand-find-influencer';
import './scripts/brand-find-influencer-api-integration';
import './partials/header/header';
import './partials/loader';
import SelectCountry from './partials/select2.country';


// Adding a cool transition
jQuery.extend(jQuery.easing, {
  easeNav(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
  }
});

jQuery('select')
  .select2({
    minimumResultsForSearch: -1,
    templateResult: jQuery(this)
      .hasClass('with-flags') ? SelectCountry : undefined,
    templateSelection: jQuery(this)
      .hasClass('with-flags') ? SelectCountry : undefined
  })
  .on('select2:unselect', function (e) {

    if (e.params.originalEvent) {
      e.params.originalEvent.stopPropagation();
    }

  });

jQuery(document)
  .on('click', '.checked-all', function (e) {
    let $checked = jQuery(e.currentTarget)
      .closest('.form-row' || 'form-group')
      .find('input:checkbox');
    $checked.not(this)
      .prop('checked', this.checked);
  })
  .on('click', '.dropdown-menu.show [data-toggle="tab"]', function (e) {
    e.stopPropagation();

  });
