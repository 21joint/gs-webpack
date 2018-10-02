import {SearchApi} from "./SearchApi";

let searchApi = new SearchApi("http://api.growsocial.com");

$('#lang-apply').on("click",function () {
    let selectedValues = $("select[name=languages]").val();


    searchApi.setLanguage(selectedValues);

    searchApi.makeSearchRequest();
});

$('#followers-apply').on("click",function () {
    let values = {min: $("#followers-min").val().replace(/,/g, ""), max:$("#followers-max").val().replace(/,/g, "")};

    searchApi.setFollowers(values);



    searchApi.makeSearchRequest();
});