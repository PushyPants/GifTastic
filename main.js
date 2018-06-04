let apiKey = 'zVIVp4ETXeNFTJGDlxDKhaodyQgovHBA';
let trendRelated;



function getTrending() {
    $.ajax({
        url: 'http://api.giphy.com/v1/gifs/trending?api_key='+apiKey+'&limit=10',
        method: 'GET'
    }).then(function(trendingObject){
        let tData = trendingObject.data;
        
        $(tData).each(function(i){
            let title = this.title;
            let shortTitle = title.split(' ').slice(0,3).join(' ');
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
                        
                        <div class="col-md-8">
                        <h4 class="realtedTitle text-right">Gifs related to: ${shortTitle}</h4>
                        </div>
                    </div>
                </div>
            `);
            $('#slide0').addClass('active');

        });

    })
}

getTrending();