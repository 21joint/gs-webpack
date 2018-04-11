import './vendor';
/**
 * Application entry point
 */
// Load application styles
import './styles/index.scss';
// Load application vendor code
import './components/header.js';
import './components/loader.js';
import './components/terms.js';
import rangeSlider from './components/range-sliders.js';

export default (function() {
  $(document).ready(function() {
    $('select').select2({
      minimumResultsForSearch: -1,
    });
    rangeSlider();
  });
})