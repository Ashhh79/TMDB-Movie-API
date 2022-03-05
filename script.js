//tmdb API 
const API_KEY='api_key=7bfc6259647538a23e2ec02ba497563e';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL=BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';

const search_url=BASE_URL+'/search/movie?'+API_KEY;

const main=document.getElementById("main");
const form= document.getElementById("form");
const search= document.getElementById('search');

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data.results);
        showMovies(data.results);

    })
}

function showMovies(data){

    main.innerHTML="";


    data.forEach(movie => {
        const {title,poster_path,vote_average,overview}=movie; 

        const movieEL=document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML=`
            <img src="${IMG_URL+poster_path}" alt="${title}" >

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getcolour(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">

                <h3>Overview</h3>
                ${overview}
            </div>
        
        
        `

        main.appendChild(movieEL);
    });
}


function getcolour(vote){
    if(vote>=8){
        return "green"
    }
    else if (vote>=5){
        return "orange"
    }
    else {
        return "red"
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm=search.value;
    if(searchTerm){
        getMovies(search_url+'&query='+searchTerm);
    }
    else{
        getMovies(API_URL);
    }
})