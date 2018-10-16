import {SearchApi} from "./SearchApi";


let searchApi = new SearchApi("http://api.growsocial.com");

$('#lang-apply').on("click",function () {
    let selectedValues = $("select[name=languages]").val();
    searchApi.setLanguage(selectedValues);
    searchApi.makeSearchRequest();
});
$('.reset-language').on("click",function () {
    searchApi.resetLanguage();
    searchApi.makeSearchRequest();
    $("select[name=languages]").val("");
});

$('#followers-apply').on("click",function () {
    let values = {min: $("#followers-min").val().replace(/,/g, ""), max:$("#followers-max").val().replace(/,/g, "")};
    searchApi.setFollowers(values);
    searchApi.makeSearchRequest();
});
$('.reset-followers').on("click",function () {
    searchApi.resetFollowers();
    searchApi.makeSearchRequest();
});

$('#likes-apply').on("click",function () {
    let values = {min: $("#likes-min").val().replace(/,/g, ""), max:$("#likes-max").val().replace(/,/g, "")};
    searchApi.setLikes(values);
    searchApi.makeSearchRequest();
});
$('.reset-likes').on("click",function () {
    searchApi.resetLikes();
    searchApi.makeSearchRequest();
});
$('#comments-apply').on("click",function () {
    let values = {min: $("#comments-min").val().replace(/,/g, ""), max:$("#comments-max").val().replace(/,/g, "")};
    searchApi.setComments(values);
    searchApi.makeSearchRequest();
});
$('.reset-comments').on("click",function () {
    searchApi.resetComments();
    searchApi.makeSearchRequest();
});
