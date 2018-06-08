$(document).ready(function(){

    let apiKey = 'zVIVp4ETXeNFTJGDlxDKhaodyQgovHBA';
    let trendRelated;
    let topics = ['cat','dog','puppy','monkey','bear','raccoon','meercat'];
    let buttonQuery;
    let searchResults;
    let tState = 'open'
    let cardAnimation = 'paused'
    
    // let sessionTopics = topics.join(",");
    // console.log("This is what I put in session storage: ",sessionTopics);
    // sessionStorage.setItem("topics", sessionTopics);
    // let loadedTopics = sessionStorage.getItem("topics").split(",");
    // console.log("This is what I get out of session storage: ",loadedTopics)

    // let searchQuery = "My Super Awesome String, This is another string, Here is another one";
    // let newStringArrayToBeConverted = searchQuery.split(",");
    // console.log("This is my array of strings to be converted: " , newStringArrayToBeConverted);
    // newStringArrayToBeConverted.forEach((element, i)=>{
    //     let myConvertedQuery = element.split(" ").join("+");
    //     console.log("This is my converted search: ",myConvertedQuery);
    // })
    // console.log("This is my uncoverted search: " , searchQuery);
    // let myConvertedQuery = searchQuery.split(" ").join("+");
    // console.log("This is my converted search: ",myConvertedQuery);

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
        let pButton = $('<button>').attr('class','btn btn-light play-pause');
        let pSpan = $('<span>').attr('class','fas fas-play');
        $('#resultContainer').append(pButton);
        pButton.append(pSpan);
        toggleAnimation();

        $('.play-pause span').attr('class', 'fas fa-play')
        
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
                class: `paused card-img-top resImg${i}`,
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
            let btnA = $('<a>').attr({
                href: val.bitly_url,
                target: '_blank',
            })
            let resBtn = $('<button>').attr({
                type: 'button',
                class: 'btn btn-sm btn-outline-secondary',
                'data-id': 'resBtn-'+i,
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
                                resBtnGrp.append(btnA);
                                btnA.append(resBtn);
                                resBtn.append(glyphGlobe);
                            resBtnContainer.append(resRating);
                                resRating.text('Rated: '+val.rating);
                                
            
                $('.resImg'+i).on('click', function(){
                    console.log($(this))
                    
                    if ($(this).attr('class').includes('paused')) {
                        $(this).removeClass('paused').addClass('animated');
                        $(this).attr('src', $(this).data().animated);
                    } else if ($(this).attr('class').includes('animated')) {
                        $(this).removeClass('animated').addClass('paused');
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

            function formSearch(){
                $.ajax({
                    url: 'http://api.giphy.com/v1/gifs/search?api_key='+apiKey+'&limit=10&q='+searchTerm,
                    method: 'GET',
                }).then(function(searchObject){
                    $('#searchResults').empty();
                    populateResults(searchObject);
                });
                $('#searchBar')[0].reset();
            };
            if (searchTerm === 'collin' || searchTerm === 'Collin') {
                searchTerm = 'glittery'
                formSearch();

                let audio = new Audio('audio/stream.mp3');
                console.log(audio)
                audio.play();

                setTimeout(function(){
                $('.play-pause').trigger('click');
                console.log('trigger function should have fired')
                },3000);

            } else {
                if (topics.includes(searchTerm)) {
                    formSearch();
                } else {
                    topics.push(searchTerm);
                    formSearch();
                    createButtons();
                }
            };
        });``
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
            $('.carousel').animate({'opacity': 1},200);
            $('.jumbotron .container').animate({'height':'100%'},300);
        }
    };

    function toggleTrending(){
        $('.jumboHeader').on('click',function(){
            (tState === 'open') ? hideTrending() : showTrending();
        })
    }

    function toggleNavBtn(){
        $('.navbar-toggler').on('click', function(){
            if ($('#navbarHeader').attr('class').includes('show')) {
                $('.navbar-toggler span').attr('class','fas fa-angle-down fa-lg');
            } else {
                $('.navbar-toggler span').attr('class','fas fa-angle-up fa-lg');

            };
        });
    };

    toggleNavBtn();

    toggleTrending();

    function toggleAnimation() {
        $('.play-pause').on('click', function(){
            if (cardAnimation === 'paused') {
                $('.card img.paused').each(function(i,val) {
                    $('.play-pause span').attr('class', 'fas fa-pause')
                    $('.card img.paused').addClass('animated').removeClass('paused')
                    let srcString = this.src.split('_s.').join('.');
                    $(this).attr('src',srcString);
                    cardAnimation = 'animated';
                });
            } else {
                $('.card img.animated').each(function(i,val) {
                    $('.play-pause span').attr('class', 'fas fa-play')
                    $('.card img.animated').addClass('paused').removeClass('animated')
                    let srcString = this.src.split('.gif').join('_s.gif');
                    $(this).attr('src',srcString);
                    cardAnimation = 'paused';
                });
        }
        })
    };
    
});


