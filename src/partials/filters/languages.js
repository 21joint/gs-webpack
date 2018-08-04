import _ from 'lodash';
import LanguageData from '../../languages';

const generateLanguages = () => {
  let html = '';
  _.each(LanguageData, (language) => {
    html += `<option value="${language.name}">${language.name}</option>`;
  });
  return html;
};

const createOptions = () => {

  let template;
  template = `<button type="button" class="btn btn-sm btn-outline-primary" data-toggle="dropdown" aria-haspopup="true"
        title="Language" aria-expanded="false">
  <i class="icon-close ml-2 align-middle"></i>
</button><div class="dropdown-menu p-0" style="width: 400px;">
  <div class="container-fluid">
    <div class="form-row py-3 justify-content-between">
      <div class="col-auto">
        <h6 class="text-dark mt-1 mb-3"><strong>Language</strong></h6>
      </div>
      <div class="col-auto">
        <img class="r-icon--medium" src="${require('../../assets/images/info.svg')}" alt="Awareness">
      </div>
    </div>
    <div class="form-row pb-3 align-items-center">
      <div class="col">
        <!--<input data-tags title="Targeting" placeholder="Write language here" type="text" class="form-control"-->
               <!--data-use=" "> <input class="input-tags&#45;&#45;query" type="hidden">-->
        <select name="languages" data-use=" value," title="Languages" style="width: 100%" id="barmi${new Date().getTime()}" multiple="true">
          ${generateLanguages()}
        </select>
      </div>
    </div>
    <div class="form-row py-3 align-items-center justify-content-between dropdown-menu--actions">
      <div class="col-auto">
        <button class="btn btn-block btn-sm btn-cancel" type="button" data-dismiss="dropdown">
          Cancel
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-block btn-primary btn-sm btn-apply" type="button">
          Apply
        </button>
      </div>
    </div>
  </div>
</div>`;
  return template;
};


let html = createOptions();

module.exports = html;
