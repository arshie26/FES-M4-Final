console.log("new page");

let moviesList;

if(localStorage.getItem("movies")){
    getMoviesFromStorage();
}

function getMoviesFromStorage(){
    moviesList = JSON.parse(localStorage.getItem("movies"));
    renderMovies();
}

function openMenu(){
    document.body.classList += "open__menu";
}

function closeMenu(){
    document.body.classList.remove("open__menu");
}

async function getMovies(event){
    let cardsWrapper = document.querySelector(".cards");
    cardsWrapper.innerHTML = `
        <div class="spinner__container">
            <i class="fas fa-spinner movies__loading--spinner"></i>
        </div>`;
    let query = document.querySelector(".search");
    let userSearch = query.value;
    let moviesPromise = await fetch(`https://www.omdbapi.com/?s=${userSearch}&apikey=b971c236`);
    moviesList = await moviesPromise.json();
    renderMovies();
}

function renderMovies(filter){
    console.log(filter);
    if(filter === "year"){
        console.log("filtering by year");
        moviesList.Search = moviesList.Search.sort((a, b) => {
            if(a.Year.includes("–")){
                console.log("year has -");
                return year = a.Year.substring(0,4) - b.Year;
            } 
            else if (b.Year.includes("–")){
                console.log("year has -");
                return a.Year - b.Year.substring(0,4);
            }
            return a.Year > b.Year;
        });
    }
    else if(filter === "name"){
        moviesList.Search = moviesList.Search.sort((a, b) => {
            return b.Title < a.Title;
        });
    }
    else{
        moviesList.Search = moviesList.Search.sort((a, b) => {
            return b.Type < a.Type;
        })
    }
    console.log(moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList))
    setTimeout(() => {    
        let cardsWrapper = document.querySelector(".cards");
        cardsWrapper.innerHTML = moviesList.Search.map((movie) => {
        
            return `
            <div class="card">
                <div class="img__container">
                    <img class="img" src="${movie.Poster}">
                </div>
                <div class="description">
                    <h4 class="title">${movie.Title}</h5>
                    <div>
                        <i class="fa-solid fa-calendar"></i>
                        <p class="year">${movie.Year}</p>
                    </div>
                    <div>
                        <i class="fa-regular fa-id-badge"></i>
                        <p class="imdbID">${movie.imdbID}</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-tv"></i>
                        <p class="type">${movie.Type}</p>
                    </div>
                </div>
            </div>`
        }).join("");
    })
}



function goHome(){
    console.log(window.location);
    let url = window.location.href;
    if(window.location.href.includes("find.html")){
        url = window.location.href.slice(0, window.location.href.length-9);
        url += "index.html";
    }
    window.location.href=url;
}

function goFind(){
    let url = window.location.href;
    window.location.href=url;
}