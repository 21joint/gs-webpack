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
    let valuesPercentitle = {min: $("#likes-percentile-min").val().replace(/,/g, ""), max:$("#likes-percentile-max").val().replace(/,/g, "")};
    searchApi.setLikesPercentile(valuesPercentitle);
    searchApi.makeSearchRequest();
});
$('.reset-likes').on("click",function () {
    searchApi.resetLikes();
    searchApi.resetLikesPercentile();
    searchApi.makeSearchRequest();
});
$('#comments-apply').on("click",function () {
    let values = {min: $("#comments-min").val().replace(/,/g, ""), max:$("#comments-max").val().replace(/,/g, "")};
    searchApi.setComments(values);
    let valuesPercentile = {min: $("#comments-percentile-min").val().replace(/,/g, ""), max:$("#comments-percentile-max").val().replace(/,/g, "")};
    searchApi.setCommentsPercentile(valuesPercentile);
    searchApi.makeSearchRequest();
});
$('.reset-comments').on("click",function () {
    searchApi.resetComments();
    searchApi.resetCommentsPercentile();
    searchApi.makeSearchRequest();
});
$('#sponsored-apply').on("click",function () {
    let valuesSponsored = {min: $("#sponsored-min").val().replace(/,/g, ""), max:$("#sponsored-max").val().replace(/,/g, "")};
    searchApi.setSponsored(valuesSponsored);
    let valuesSponsoredPercentitle = {min: $("#sponsored-percentile-min").val().replace(/,/g, ""), max:$("#sponsored-percentile-max").val().replace(/,/g, "")};
    searchApi.setSponsoredPercentile(valuesSponsoredPercentitle);
    searchApi.makeSearchRequest();
});
$('.reset-sponsored').on("click",function () {
    searchApi.resetSponsored();
    searchApi.resetSponsoredPercentile();
    searchApi.makeSearchRequest();
});
$('#search-sort #sortBy').on("change",function () {

    let sortField= $("select[name=sortBy]").val();
    let sortOrder = "desc";
    if(sortField.localeCompare("followers-desc")===0){
        sortField="followers";
        sortOrder = "desc";
    }
    if(sortField.localeCompare("followers-asc")===0){
        sortField="followers";
        sortOrder = "asc";
    }

    searchApi.setSortField(sortField,sortOrder);
    searchApi.makeSearchRequest();
});