$(document).ready(function(){

    let apiKey = 'zVIVp4ETXeNFTJGDlxDKhaodyQgovHBA';
    let trendRelated;
    let topics = ['cat','dog','puppy','monkey','bear','raccoon'];
    let buttonQuery;


    function getTrending() {
        $.ajax({
            url: 'http://api.giphy.com/v1/gifs/trending?api_key='+apiKey+'&limit=10',
            method: 'GET'
        }).then(function(trendingObject){
            let tData = trendingObject.data;
            
            $(tData).each(function(i){
                let title = this.title;
                let trendSearch = title.split(' ').slice(0,3).join('_');
                
                $('.carousel-inner').append(`
                <div id ="slide${i}" class="carousel-item">
                <div class="row carouselRow">
                <div class="col-md-4">
                <h3 class="imgTitle">${this.title}</h3>
                <img class="d-block w-100" src="${this.images.original.url}" alt="slide ${i+1}">
                <p class="float-left imgRating">Rating: ${this.rating}</p>
                <p class="float-right imgLink"><a href="${this.bitly_url}" target="blank">Visit Page</a></p>
                </div>
                <div class="col-md-7 offset-md-1 text-right">
                <div class="relatedContainer">
                <h4 class="relatedTitle text-right">Related Gifs:</h4>
                <div class="row relatedRow${i}">
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
                `);
                $('#slide0').addClass('active');
                
                $.ajax({
                    url: 'http://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&limit=6&q='+trendSearch,
                    method: 'GET'
                }).then(function(searchObject){
                    relatedGifs = searchObject.data;

                    $(relatedGifs).each(function(){
                        //append related column with gif results
                        $('.relatedRow'+i).append(`
                        <div id="relatedSlide${i}" class="col-md-4">
                        <a href="${this.bitly_url}" target="blank">
                        <img src="${this.images.original.url}" class="img-fluid w-100 relatedImg">
                        </a>
                        </div>
                        `)
                    })

                });

            });

        })
    }
    getTrending();

    function createButtons() {
        //add "button check" if button exists hightlight 
            //else complete below
        $(topics).each(function(index,value){
            let btnVals = $('.searchTerms').text();
            $('.searchTerms').append(`
            <button id ="sT-${index}" type="button" class="btn btn-secondary btn-sm btnSearch" value="${value}">${value}</button>
            `)
        })
    };

    createButtons();


        //create buttons from array in the DOM
            //user clicks button and gets 10 static results from giphy from that word
                //under each gif it should display the rating
            
    //when user clicks on the giphy image the gif starts to play
        //clicks again and the gif stops playing


    //search form takes a value from the input and returns the same result as the button. 

});