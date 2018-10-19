import {Icons} from './icons';

const _Icons = new Icons();

export class Influencer {

  constructor(influencer) {
    this.name = influencer.name;
    this.age = influencer.age;
    this.photos = influencer.photos;
    this.social = influencer.social;
    this.gscore = influencer.gscore;
  }

  static isClosable() {
    return `<button class="single-influencer--archive p-0">            
                <svg width="26px" height="26px" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <g id="Find-influencer" transform="translate(-464.000000, -472.000000)" stroke="#FFFFFF" stroke-width="3">
                            <g id="Group-6-Copy" transform="translate(466.000000, 474.000000)">
                                <path d="M0,0 L18,18" id="Stroke-1"></path>
                                <path d="M18,0 L0,18" id="Stroke-3"></path>
                            </g>
                        </g>
                    </g>
                </svg>
              </button>`;
  }

  static gsScoreHandler(x) {
    let cl = '';
    if (x >= 0 && x <= 10) {
      cl = 'gs-score--1';
    }
    if (x > 10 && x <= 25) {
      cl = 'gs-score--2';
    }
    if (x > 25 && x <= 50) {
      cl = 'gs-score--3';
    }
    if (x > 50 && x <= 75) {
      cl = 'gs-score--4';
    }
    if (x > 75 && x <= 100) {
      cl = 'gs-score--5';
    }
    return `<div class="single-infl-gscore d-flex align-items-center">
                    <span class="gs-score ${cl}"></span>
                    <span>${x}%</span>
                  </div>`;
  }

  createSocial() {
    let _instance = this,
      _social = '',
      _quantityHandler;
    _quantityHandler = function (quantity) {

      if (quantity < 1000) {
        return quantity;
      }
      else {
        let _qStr = quantity.toString(10)
          .split('')
          .join('');
        return _qStr.slice(0, _qStr.length - 3);
      }
    };

    for (let key in _instance.social) {
      if (_instance.social.hasOwnProperty(key)) {
        _social += '<li>' + _Icons.insertIcon({title: key}) + '<span class="text-asphalt">' + _quantityHandler(_instance.social[key]) +
          'k</span></li>';
      }
    }
    return _social;
  }

  createSlides() {
    let _slides = '';
    for (let j = 0; j < this.photos.length; j++) {
      const photo = this.photos[j];
      _slides += `<div class="single-card--slide"><a role="button" tabindex="-1" data-toggle="modal" href="#modalSingleInfl" aria-expanded="false"><div class="single-slide--image" style="background-image:url(${ photo });"></div></a></div>`;
    }
    return _slides;
  }

  load(opts) {
    // language=HTML
    return `<div class="single-profile--card" data-infname="${this.name}" data-infage="${this.age}" data-gscore="${this.gscore}">             
              <div class="single-card--title">
                <div class="row justify-content-between flex-nowrap align-items-center">
                  <div class="col">
                    <a tabindex="-1" 
                    data-toggle="modal"
                    aria-expanded="false"
                    href="#modalSingleInfl"       
                    <h5><b>${this.name}, ${this.age}</b></h5></a>
                  </div>
                  <div class="col-auto">
                      ${Influencer.gsScoreHandler(this.gscore)}     
                  </div>
                </div>
              </div>
              <div class="single-card--owlwrapper">
              ${(opts && opts.closable) ? Influencer.isClosable(opts.closable) : ''}
              <div class="dropdown">
              
                <a role="button" class="single-card--likebtn" tabindex="-1" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <svg width="28px" height="28px" viewBox="0 0 38 36" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path class="heart-svg" d="M19.2186,35.744 C18.9286,35.744 18.6296,35.692 18.3296,35.591 C18.2826,35.578 18.2366,35.562 18.1916,35.544 L18.1906,35.546 C17.9376,35.449 17.7006,35.312 17.4836,35.138 C17.4426,35.111 17.4036,35.083 17.3666,35.053 C17.3126,35.008 17.2616,34.96 17.2146,34.909 C17.1906,34.887 17.1686,34.864 17.1496,34.844 L16.9086,34.591 C11.4596,28.875 8.4286,25.595 6.8456,23.849 C2.5776,19.157 -0.0004,16.324 -0.0004,11.368 C-0.0004,5.991 4.5256,0 11.0206,0 C15.0546,0.008 17.6356,1.692 19.1856,3.311 C21.1876,1.168 23.9646,0.007 27.1936,0 L27.1966,0 C33.5636,0 37.9996,5.991 37.9996,11.368 C37.9996,16.289 35.4976,19.121 31.3526,23.813 C27.6116,28.052 21.3856,34.742 21.2506,34.877 L21.2506,34.877 C21.2436,34.884 21.2366,34.891 21.2286,34.898 C21.1996,34.93 21.1686,34.959 21.1366,34.988 L21.1366,34.988 C21.1136,35.01 21.0866,35.032 21.0586,35.055 C20.8406,35.242 20.5926,35.398 20.3196,35.519 C20.2486,35.55 20.1746,35.576 20.0996,35.596 C19.8026,35.694 19.5066,35.744 19.2186,35.744 L19.2186,35.744 Z" id="Path" fill="#000000" fill-opacity="0.463428442"/>
                    <path d="M11.0176,3 C6.2936,3 2.9996,7.41 2.9996,11.368 C2.9996,15.164 5.0276,17.392 9.0656,21.832 C10.6396,23.566 13.6526,26.828 19.0806,32.521 C19.1316,32.575 19.1766,32.623 19.2156,32.664 C19.9986,31.823 25.4936,25.918 29.0936,21.84 C33.0296,17.384 34.9996,15.153 34.9996,11.368 C34.9996,7.411 31.7966,3.001 27.1996,3 C23.4756,3.008 21.4856,4.93 20.4726,6.541 C20.1996,6.975 19.7236,7.239 19.2106,7.242 C18.7016,7.255 18.2196,6.985 17.9416,6.554 C16.9006,4.937 14.8536,3.008 11.0176,3 L11.0176,3 Z M20.1476,33.856 L20.1576,33.856 L20.1476,33.856 Z M18.3166,33.892 L18.3266,33.892 L18.3166,33.892 Z M19.2186,35.744 C18.9286,35.744 18.6296,35.692 18.3296,35.591 C18.2826,35.578 18.2366,35.562 18.1916,35.544 L18.1906,35.546 C17.9376,35.449 17.7006,35.312 17.4836,35.138 C17.4426,35.111 17.4036,35.083 17.3666,35.053 C17.3126,35.008 17.2616,34.96 17.2146,34.909 C17.1906,34.887 17.1686,34.864 17.1496,34.844 L16.9086,34.591 C11.4596,28.875 8.4286,25.595 6.8456,23.849 C2.5776,19.157 -0.0004,16.324 -0.0004,11.368 C-0.0004,5.991 4.5256,0 11.0206,0 C15.0546,0.008 17.6356,1.692 19.1856,3.311 C21.1876,1.168 23.9646,0.007 27.1936,0 L27.1966,0 C33.5636,0 37.9996,5.991 37.9996,11.368 C37.9996,16.289 35.4976,19.121 31.3526,23.813 C27.6116,28.052 21.3856,34.742 21.2506,34.877 L21.2506,34.877 C21.2436,34.884 21.2366,34.891 21.2286,34.898 C21.1996,34.93 21.1686,34.959 21.1366,34.988 L21.1366,34.988 C21.1136,35.01 21.0866,35.032 21.0586,35.055 C20.8406,35.242 20.5926,35.398 20.3196,35.519 C20.2486,35.55 20.1746,35.576 20.0996,35.596 C19.8026,35.694 19.5066,35.744 19.2186,35.744 L19.2186,35.744 Z" id="Fill-1" fill="#FFFFFF"/>
                  </g>
                </svg>
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                 <a class="dropdown-item" href="#">Action</a>
                 <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
              </div>
              
            </div>
              
              
                 <div class="owl-carousel single-card--carousel" id="single-card--owlcarousel__${new Date().getTime()}">
                    ${ this.createSlides() }          
                </div>
              </div>
              <div class="single-card--networks">
                <ul class="flex-row">${this.createSocial()}</ul>
              </div>
          </div>`;
  }

}

export class Language {
  constructor(language) {

  }
}
