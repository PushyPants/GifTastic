$(document).ready(function(){

    let apiKey = 'zVIVp4ETXeNFTJGDlxDKhaodyQgovHBA';
    let trendRelated;
    let topics = ['cat','dog','puppy','monkey','bear','raccoon'];
    let buttonQuery;
    let searchResults;
    let tState = 'open'


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
                                (shortTitle === '') ? lgImgTitle.text(title) : lgImgTitle.text(shortTitle);
                            lgImgCol.append(lgImg);
                            lgImgCol.append(pRating);
                                pRating.text('Rated: '+val.rating);
                            lgImgCol.append(pLinkBtn);
                                pLinkBtn.append(pLink);
                                    pLink.attr('visit');
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
        $('.searchTerms').empty();
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

    function populateResults(obj){
        searchResults = obj.data;
        gifAnimated = false;
        
        $(searchResults).each(function(i, val){                    
            let searchResults = $('#searchResults');
            let resItem = $('<div>').attr({
                class: 'col-md-4 resItem',
                'data-id': 'resItem-'+i,
            });
            let resCard = $('<div>').attr({
                class: 'card mb-4 box-shadow',
                'data-id': 'resCard-'+i,
            });
            let resImg = $('<img>').attr({
                class: `card-img-top resImg${i}`,
                src: val.images.original_still.url,
                'data-still' : val.images.original_still.url,
                'data-animated' : val.images.original.url,
                'data-id': 'resImg-'+i,
            });
            let resCardBody = $('<div>').attr({
                class: 'card-body',
                'data-id': 'resCardBody-'+i,
            });
            let resCardTitle = $('<p>').attr({
                class: 'card-text',
                'data-id': 'resCardTitle-'+i,
            });
            let resBtnContainer = $('<div>').attr({
                class: 'd-flex justify-content-between align-items-center',
                'data-id': 'resBtnContainer-'+i ,
            });
            let resBtnGrp = $('<div>').attr({
                class: 'btn-group',
                'data-id': 'resBtnGrp-'+i,
            });
            let resBtn = $('<button>').attr({
                type: 'button',
                class: 'btn btn-sm btn-outline-secondary',
                'data-id': 'resBtn-'+i,
                src: val.bitly_url,
            });
            let glyphGlobe = $('<span>').attr({
                class: 'fas fa-link fa-sm',
            });
            
            let resRating = $('<small>').attr({
                class: 'text-muted',
                'data-id': 'resRating-'+i,
            });
            
            searchResults.append(resItem);
                resItem.append(resCard);
                    resCard.append(resImg);
                    resCard.append(resCardBody);
                        resCardBody.append(resCardTitle);
                            resCardTitle.text(val.title)
                        resCardBody.append(resBtnContainer);
                            resBtnContainer.append(resBtnGrp);
                                resBtnGrp.append(resBtn);
                                resBtn.append(glyphGlobe);
                            resBtnContainer.append(resRating);
                                resRating.text('Rated: '+val.rating);
                                
            
                $('.resImg'+i).on('click', function(){
                    console.log($(this))
                    
                    if (gifAnimated === false) {
                        gifAnimated = true;
                        $(this).attr('src', $(this).data().animated);
                    } else if (gifAnimated === true) {
                        gifAnimated = false;
                        $(this).attr('src', $(this).data().still);
                        
                    }
                });
            
        });
    };

    function btnSearch() {
        $('.searchTerms').on('click','.btnSearch', function(){
            hideTrending();
            $('#searchResults').empty();
            let searchTerm = $(this).val();

            $.ajax({
                url: 'http://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&limit=10&q='+searchTerm,
                method: 'GET',
            }).then(function(searchObject){
                populateResults(searchObject);
            });
           
        });
    }

    
    btnSearch();
    
    function formSubmit(){
        $('#searchBar').submit(function(event){
            event.preventDefault();
            hideTrending();
            let searchTerm = $(searchInput).val();

            topics.push(searchTerm);
            createButtons();

            $.ajax({
                url: 'http://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&limit=10&q='+searchTerm,
                method: 'GET',
            }).then(function(searchObject){
                $('#searchResults').empty();
                populateResults(searchObject);
            });
        });
    };

    formSubmit();

    function hideTrending(){        
        if (tState === 'open') {
            tState = 'close';
            $('.jumboHeader h2').animate({'font-size':'20px'},300);
            $('.jumbotron').animate({'padding-top':'10px','padding-bottom':'3px'},300);
            $('.carousel').animate({'opacity': 0},300);
            $('.jumbotron .container').animate({'height':'0'},300);
        }
       
    };

    function showTrending(){
        if (tState === 'close') {
            tState = 'open';
            $('.jumboHeader h2').animate({'font-size':'2rem'},300);
            $('.jumbotron').animate({'padding-top':'15px','padding-bottom':'15px'},300);
            $('.carousel').animate({'opacity': 1});
            $('.jumbotron .container').animate({'height':'100%'},300);
        }
    };

    function toggleTrending(){
        $('.jumboHeader').on('click',function(){
            (tState === 'open') ? hideTrending() : showTrending();
        })
    }

    toggleTrending();
});