setTimeout(() => {
    let searchBar = document.querySelector(".home__search");
    searchBar.addEventListener('keydown', (event) => {
        if(event.key === "Enter"){
            searchFromHome(event);
        }
    });
})

function openMenu(){
    document.body.classList += "open__menu";
}

function closeMenu(){
    document.body.classList.remove("open__menu");
}

async function searchFromHome(event){
    console.log(event);
    let query = document.querySelector(".home__search");
    let buttonWrapper = document.querySelector(".search__button");
    buttonWrapper.focus();
    buttonWrapper.innerHTML = `<i class="fas fa-spinner movies__loading--spinner"></i>`;
    console.log("Search term was ", query.value);
    let moviesPromise = await fetch(`https://www.omdbapi.com/?s=${query.value}&apikey=b971c236`);
    let moviesList = await moviesPromise.json();
    console.log(moviesList);
    localStorage.setItem("movies", JSON.stringify(moviesList));
    goFind();
}

function goHome(){
    let url = window.location.href;
    window.location.href=url;
}

function goFind(){
    let url = window.location.href;
    console.log(url);
    if(window.location.href.includes("index.html")){
        url = window.location.href.slice(0, window.location.href.length-10);
    }
    url += "find.html";
    window.location.href=url;
}