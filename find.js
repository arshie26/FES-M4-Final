

function openMenu(){
    document.body.classList += "open__menu";
}

function closeMenu(){
    document.body.classList.remove("open__menu");
}

async function getMovies(event){
    let userSearch = event.target.value;
    let moviesPromise = await fetch(`https://www.omdbapi.com/?s=${userSearch}&apikey=b971c236`);
    let moviesList = await moviesPromise.json();
    console.log(moviesList.Search);
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
    });
    
}