document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "3ef04842";
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const movieListEl = document.querySelector(".movie__list");

    const performSearch = async () => {
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            const apiURL = await fetch(
                `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`
            );
            const apiData = await apiURL.json();

            if (apiData.Search) {
                const first9Movies = apiData.Search.slice(0, 9); // Adjust the slice to 9
                const movieCardsHTML = first9Movies
                    .map(
                        (movie) =>
                            `<div class="movie__card">
                            <div class="movie__card--container">
                            <img src="${movie.Poster}" alt="${movie.Title} Poster">
                            <div class="titleYear__card">
                                <h3 class="movie__title">${movie.Title}</h3> <p>(${movie.Year})</p>
                            </div>    
                            </div>
                        </div>`
                    )
                    .join("");

                movieListEl.innerHTML = movieCardsHTML;
            } else {
                movieListEl.innerHTML = "<p>No movies found.</p>";
            }
        }
    };

    searchButton.addEventListener("click", performSearch);

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            performSearch();
        }
    });
});
