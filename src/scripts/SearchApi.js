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

    makeSearchRequest(){

        let data = {};
        if(this.languages !=null){
            data["lang"] = this.languages;
        }
        if(this.followers !=null){
            data["followers"] = this.followers;
        }
        $.ajax({
            url: this.baseUrl+"/influencers?fields=username,link,userid",

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
            }
        });


    }

    paginate(){


    }

}