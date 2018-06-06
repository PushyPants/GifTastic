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
            
            $(tData).each(function(i,val){
                let title = val.title;
                let titleSearch = title.trim().split(' ').join('_');
                let shortTitle = title.split('GIF')[0];
                let shortSearch = shortTitle.trim().split(' ').join('_');
                let setActive = $('.carousel-inner').find(`[data-id="cItem-0"]`);
                
                let carousel = $('.carousel-inner');
                let carouselItem = $('<div>').attr({
                    class: 'carousel-item',
                    'data-id': 'cItem-'+i,
                });
                let carouselRow = $('<div>').attr({
                    class: 'row carousel-row',
                    'data-id': 'cRow-'+i,
                });
                let lgImgCol = $('<div>').attr({
                    class: 'col-md-4',
                    'data-id': 'lgImgCol-'+i,
                });
                let lgImgTitle = $('<h3>').attr({
                    class: 'imgTitle',
                    'data-id': 'lgImgTitle-'+i,
                });
                let lgImg = $('<img>').attr({
                    class: 'd-block w-100',
                    src: val.images.original.url,
                    'data-id': 'lgImg-'+i,
                });
                let pRating = $('<p>').attr({
                    class: 'float-left imgRating',
                    'data-id': 'pRating-'+i
                });
                let pLinkBtn = $('<p>').attr({
                    class: 'float-right imgLink',
                    'data-id': 'pLinkBtn-'+1,
                });
                let pLink = $('<a>').attr({
                    href: val.bitly_url,
                    target: 'blank',
                    'data-id': 'pLink-'+1,
                });
                let relCol = $('<div>').attr({
                    class: 'col-md-7 offset-md-1 text-right',
                    'data-id': 'relCol-'+i,
                });
                let relContainer = $('<div>').attr({
                    class: 'relContainer',
                    'data-id': 'relContainer-'+i,
                });
                let relTitle = $('<h4>').attr({
                    class: 'relTitle text-right',
                    'data-id': 'relTitle-'+i,
                });
                let relRow = $('<div>').attr({
                    id: 'relRow-'+i,
                    class: 'row relRow',
                    'data-id': 'relRow-'+i,
                });
                carousel.append(carouselItem);
                    carouselItem.append(carouselRow);
                        carouselRow.append(lgImgCol);
                            lgImgCol.append(lgImgTitle);
                                if (shortTitle === '') {
                                    lgImgTitle.text(title);
                                } else {
                                    lgImgTitle.text(shortTitle);
                                }
                            lgImgCol.append(lgImg);
                            lgImgCol.append(pRating);
                                pRating.text('Rated: '+val.rating);
                            lgImgCol.append(pLinkBtn);
                                pLinkBtn.append(pLink);
                                    pLink.text('visit');
                        carouselRow.append(relCol);
                            relCol.append(relContainer);
                                relContainer.append(relTitle);
                                    relTitle.text('Related:');
                                relContainer.append(relRow);

                $(setActive).addClass('active');
                
                $.ajax({
                    //researched and found out about ternary operators... those are awesome!
                    url: (shortTitle === '') ? 'http://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&limit=6&q='+titleSearch : 'http://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&limit=6&q='+shortSearch,
                    method: 'GET'
                }).then(function(searchObject){
                    relatedGifs = searchObject.data;
                    
                    $(relatedGifs).each(function(j,val){
                        //append related column with gif results
                        let currentRelRow = $('#relRow-'+i);
                        let relSlide = $('<div>').attr({
                            class: 'col-md-4',
                            'data-id': 'relSlide-'+j,
                        });
                        let relImgLink = $('<a>').attr({
                            href: val.bitly_url,
                            target: 'blank',
                            'data-id': ''+j,
                        });
                        let relImg = $('<img>').attr({
                            src: val.images.original.url,
                            class: 'img-fluid w-100 relImg',
                            'data-id': 'relImg'+j,
                        });
                                       
                        currentRelRow.append(relSlide);
                        relSlide.append(relImgLink);
                        relImgLink.append(relImg);
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
                    let still = searchResults[i].images.original_still.url;
                    let animated = searchResults[i].images.original.url;
                    
                    
                    $('#searchResults').append(`
                    <div id="resultBtn-${i}" class="col-md-4 resultItem">
                    <div class="card mb-4 box-shadow">
                      <img id="resultImg-${i}" class="card-img-top" src="${still}" alt="Card image cap">
                      <div class="card-body">
                        <p class="card-text">${searchResults[i].title}</p>
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" src="${searchResults[i].bitly_url}"><span class="glyphicon glyphicon-globe"></span></button>
                          </div>
                          <small class="text-muted">${searchResults[i].rating}</small>
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

            
    //when user clicks on the giphy image the gif starts to play
        //clicks again and the gif stops playing
    function formSubmit(){
        $('#searchBar').submit(function(event){
            event.preventDefault();
            console.log($(searchInput).val());
        });
    };

    formSubmit();

    //search form takes a value from the input and returns the same result as the button. 

});