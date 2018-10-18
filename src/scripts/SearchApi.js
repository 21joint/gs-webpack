import {Influencer} from "../partials/influencer.card";
$.fn.digits = function(){
    return this.each(function(){
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
    })
}

export class SearchApi{

    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    setLanguage(languages){
        this.languages = languages;
    }

    resetLanguage(){
        this.languages = null;
    }


    setFollowers(followers){
        this.followers = followers;
    }
    resetFollowers(){
        this.followers = null;
    }
    setLikes(likes){
        this.likes = likes;
    }
    resetLikes(){
        this.likes = null;
    }
    setLikesPercentile(likesPercentile){
        this.likesPercentile = likesPercentile;
    }
    resetLikesPercentile(){
        this.likesPercentile = null;
    }
    setCommentsPercentile(commentsPercentile){
        this.commentsPercentile = commentsPercentile;
    }
    resetCommentsPercentile(){
        this.commentsPercentile = null;
    }
    resetComments(){
        this.comments = null;
    }
    setComments(comments){
        this.comments = comments;
    }
    setSponsored(sponsored){
        this.sponsored = sponsored;
    }
    resetSponsored(){
        this.sponsored = null;
    }
    setSponsoredPercentile(sponsoredPercentile){
        this.sponsoredPercentile = sponsoredPercentile;
    }
    resetSponsoredPercentile(){
        this.sponsoredPercentile = null;
    }

    setSortField(field,sortOrder){
        this.sortField = field;
        this.sortOrder = sortOrder;
    }
    drawInfluencerList(influencers) {

        console.log("drawing");
        let infHtml ="";
        $.each(influencers, function(key,inf) {
            console.log(inf.name);
            let infLocal = new Influencer(inf);
            infLocal.photos=[];
            infLocal.age=inf.followers;
            if(infLocal.name ==""){
                infLocal.name=inf.username;
            }
            infLocal.social={instagram:inf.followers};
            infHtml += '<div class="col-12 col-sm-6 col-lg-4 col-xl-3 grid-item">'+infLocal.load({ closable: true })+'</div>';
        });

        //console.log($("#loadInfluencerSearchStrip").html());
        $("#search-result-grid").html(infHtml);
        $("#search-result-grid").css("height","");
    }

    makeSearchRequest(){

        let data = {};
        if(this.languages !=null){
            data["lang"] = this.languages;
        }
        if(this.followers !=null){
            data["followers"] = this.followers;
        }

        if(this.likes !=null){
            data["likes"] = this.likes;
        }
        if(this.likesPercentile !=null){
            data["likesPercentile"] = this.likesPercentile;
        }
        if(this.comments !=null){
            data["comments"] = this.comments;
        }
        if(this.commentsPercentile !=null){
            data["commentsPercentile"] = this.commentsPercentile;
        }
        if(this.sponsored !=null){
            data["sponsored"] = this.sponsored;
        }
        if(this.sponsoredPercentile !=null){
            data["sponsoredPercentile"] = this.sponsoredPercentile;
        }
        if(this.sortField !=null && this.sortOrder!=null){
            data["sortField"] = this.sortField;
            data["sortOrder"] = this.sortOrder;
        }
        let objCur = this;
        $.ajax({
            url: this.baseUrl+"/influencers?fields=*",

            // The name of the callback parameter, as specified by the YQL service
           // jsonp: "callback",
            type: "POST",

            // Tell jQuery we're expecting JSONP
            dataType: "json",

            // Tell YQL what we want and that we want JSON
            data: {
                payload: data,
                format: "json"
            },

            // Work with the response
            success: function( response ) {
                console.log( response ); // server response
                objCur.drawInfluencerList(response.data);
                objCur.paginate(response.total,1);
                return response;
            }
        });

        return [];
    }

    paginate(total,curPage){
        $("#tot_inf_count").html(total).digits();
    }
}