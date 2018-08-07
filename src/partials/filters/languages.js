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
      <button type="button" class="btn p-0" data-toggle="modal" data-target="#answerLanguage">
                  <img class="r-icon--medium" src="${require('../../assets/images/info.svg')}" alt="Awareness">
                </button>

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
</div>
<div class="modal fade" id="answerLanguage" tabindex="-1" role="dialog" aria-labelledby="answerModalLabel"
     aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="container-fluid">
        <div class="form-row py-4">
          <div class="col">
            <h6 class="text-dark text-center mb-0"><strong>Answer</strong></h6>
          </div>
        </div>
        <div class="form-row">
          <div class="col">
            <p class="m-0">Lucky for us, we too have significant social media following. we have 186k followers
              on our two Facebook pages, an estimated 80k on our Snapchat, 32k on Instagram and a paltry 12k on our
              Twitter, but Jesus Christ, I would never in a million years ask anyone for anything for free.</p>
          </div>

        </div>
        <div class="form-row py-4">
          <div class="col text-center">
            <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Close</button>
          </div>

        </div>
      </div>

    </div>

  </div>
</div>

`;
  return template;
};


let html = createOptions();

module.exports = html;
