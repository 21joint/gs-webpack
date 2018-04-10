/**
 * Application entry point
 */
// Load application styles
import '../assets/styles/index.scss';

// Load application vendor code
import './vendor.js';
import '../modules/header.js';
import '../modules/loader.js';
import '../modules/terms.js';
import rangeSlider from '../modules/range-sliders';

rangeSlider();

$(document).ready(function () {
    $('select').select2({
        minimumResultsForSearch: -1
    });
});