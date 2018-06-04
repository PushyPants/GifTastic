$(document).ready(function(){

    let apiKey = 'zVIVp4ETXeNFTJGDlxDKhaodyQgovHBA';
    let trendRelated;
    let topics = ['cat','dog','puppy','monkey','bear','raccoon'];
    let buttonQuery;
    let searchResults;


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

    function btnSearch() {
        $('.searchTerms').on('click','.btnSearch', function(){
            let searchTerm = $(this).val();

            $.ajax({
                url: 'http://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&limit=10&q='+searchTerm,
                method: 'GET',
            }).then(function(searchObject){
                searchResults = searchObject.data;
                
                $(searchResults).each(function(i){
                    let still = this.images.original_still.url;
                    let animated = this.images.original.url;
                    
                    
                    $('#searchResults').append(`
                    <div id="resultBtn-${i}" class="col-md-4 resultItem">
                    <div class="card mb-4 box-shadow">
                      <img id="resultImg-${i}" class="card-img-top" src="${still}" alt="Card image cap">
                      <div class="card-body">
                        <p class="card-text">${this.title}</p>
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" src="${this.bitly_url}"><span class="glyphicon glyphicon-globe"></span></button>
                          </div>
                          <small class="text-muted">${this.rating}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                    `);

                    $('#resultBtn-'+i).on('click', function(){
                        $('#resultImg-'+i).attr('src', animated);
                    });
                });
            });
        });
    }

    btnSearch();

        //create buttons from array in the DOM
            //user clicks button and gets 10 static results from giphy from that word
                //under each gif it should display the rating
            
    //when user clicks on the giphy image the gif starts to play
        //clicks again and the gif stops playing


    //search form takes a value from the input and returns the same result as the button. 

});