async function main() {
    const apiKey = '3ef04842';
    const searchTerm = 'Batman'; // Change this to the movie you want to search for
    const apiURL = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`);
    const apiData = await apiURL.json();

    const movieListEl = document.querySelector('.movie__list');
    console.log(apiData)
    if (apiData.Search) {
        const movieCardsHTML = apiData.Search
            .map(movie =>
                `<div class="movie__card">
                    <div class="movie__card--container">
                       
                        <img src="${movie.Poster}" alt="${movie.Title} Poster">
                    </div>
                </div>`
            )
            .join("");

        movieListEl.innerHTML = movieCardsHTML;
    } else {
        movieListEl.innerHTML = "<p>No movies found.</p>";
    }
}

main();
