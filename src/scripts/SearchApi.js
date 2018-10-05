import {Influencer} from "../partials/influencer.card";
export class SearchApi{

    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    setLanguage(languages){
        this.languages = languages;
    }

    setFollowers(followers){
        this.followers = followers;
    }
    drawInfluencerList(influencers) {

        console.log("drawing");


        let infHtml ="";

        $.each(influencers, function(key,inf) {
            console.log(inf.name);
            let infLocal = new Influencer(inf);
            infLocal.photos=[];
            infHtml += infLocal.load({ closable: true });
        });

        //console.log($("#loadInfluencerSearchStrip").html());

        $(".loadInfluencerSearchStrip").html(infHtml);

    }

    makeSearchRequest(){

        let data = {};
        if(this.languages !=null){
            data["lang"] = this.languages;
        }
        if(this.followers !=null){
            data["followers"] = this.followers;
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

                return response;
            }
        });

        return [];

    }

    paginate(){


    }



}