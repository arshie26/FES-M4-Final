if(document.querySelector(".cards")){
    console.log("new page");
    let moviesList = JSON.parse(localStorage.getItem("movies"));
    renderMovies(moviesList);
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
    let userSearch = event.target.value;
    let moviesPromise = await fetch(`https://www.omdbapi.com/?s=${userSearch}&apikey=b971c236`);
    let moviesList = await moviesPromise.json();
    console.log(moviesList.Search);
    renderMovies(moviesList);
} 

function renderMovies(moviesList){
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

async function searchFromHome(event){
    let query = document.querySelector(".home__search");
    let buttonWrapper = document.querySelector(".search__button");
    buttonWrapper.focus();
    buttonWrapper.innerHTML = `<i class="fas fa-spinner movies__loading--spinner"></i>`;
    console.log("Search term was ", query.value);
    let moviesPromise = await fetch(`https://www.omdbapi.com/?s=${query.value}&apikey=b971c236`);
    let moviesList = await moviesPromise.json();
    console.log(moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
    /*window.location.href="http://127.0.0.1:8080/FES-M4-Final/find.html";*/
}