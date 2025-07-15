let searchInput = document.querySelector(".serch-input");
let btn = document.querySelector(".bt1");
let API_KEY = "74695a04";
let loader = document.querySelector(".loaderdiv");

const showLoader = () => loader.classList.remove("hide");
const hideLoader = () => loader.classList.add("hide");

const fetchMovies = async (inputValue) => {
  let url = `https://www.omdbapi.com/?s=${inputValue}&apikey=${API_KEY}`;
  let response = await fetch(url);
  let data = await response.json();
  return data;
};

const renderMovies = (data) => {
  let container = document.querySelector(".serch-results");
  container.innerHTML = "";

  if (data.Response === "True" && data.Search) {
    data.Search.forEach((movie, index) => {
      const poster = movie.Poster !== "N/A" ? movie.Poster : "image/image-not-found.jfif";
      const uniqueId = `rating-${movie.imdbID}`;

      container.innerHTML += `
        <div class="div1">
          <div class="imgofmovie">
            <img src="${poster}" alt="${movie.Title}" loading="lazy">
          </div>
          <div class="combine">
            <div class="rating" id="${uniqueId}">
              <p>Loading...</p>
            </div>
            <div class="type">
              <p>${movie.Type}</p>
            </div>
          </div>
          <div class="actor">
            <h3>${movie.Title}</h3>
          </div>
        </div>
      `;

      // Delay fetching ratings using setTimeout
      setTimeout(() => {
        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
          .then((res) => res.json())
          .then((details) => {
            const ratingEl = document.getElementById(uniqueId);
            if (ratingEl) {
              ratingEl.innerHTML = `<p>${details.imdbRating || "N/A"}</p>`;
            }
          });
      }, index * 300); // each fetch delayed by 300ms per card
    });
  } else {
    container.innerHTML = `<h1 style="color:white;">Movie not found</h1>`;
  }
};

const handleSearch = async () => {
  let value = searchInput.value.trim();
  if (value.length >= 2) {
    showLoader();
    const data = await fetchMovies(value);
    renderMovies(data);
    hideLoader();
  }
};

// Debounce input
let debounceTimeout;
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => handleSearch(), 300);
  }
});

btn.addEventListener("click", handleSearch);
