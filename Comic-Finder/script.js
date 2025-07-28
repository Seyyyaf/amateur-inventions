document.addEventListener("DOMContentLoaded", () => {
  const genreSelect = document.getElementById("genreSelect");
  const searchInput = document.getElementById("searchInput");
  const comicList = document.getElementById("comicList");

  // Load comic data
  fetch("comics.json")
    .then(res => res.json())
    .then(data => {
      // Function to display filtered comics
      function showComics(genre, keyword = "") {
        comicList.innerHTML = "";

        let filtered = genre === "all"
          ? data
          : data.filter(c => c.genre.toLowerCase() === genre.toLowerCase());

        if (keyword.trim() !== "") {
          filtered = filtered.filter(c =>
            c.title.toLowerCase().includes(keyword.toLowerCase())
          );
        }

        if (filtered.length === 0) {
          comicList.innerHTML = "<p>No comics found.</p>";
          return;
        }

        filtered.forEach(comic => {
          const div = document.createElement("div");
          div.className = "comic-card";
          div.innerHTML = `
            <img src="${comic.image}" alt="${comic.title}" class="cover">
            <h3>${comic.title}</h3>
            <p><strong>Genre:</strong> ${comic.genre}</p>
            <p><strong>Author:</strong> ${comic.author}</p>
            <p>${comic.description}</p>
            <a href="${comic.link}" target="_blank">Read on Webtoon</a>
          `;
          comicList.appendChild(div);
        });
      }

      // Initial display
      showComics("all");

      // Event listeners
      genreSelect.addEventListener("change", () => {
        showComics(genreSelect.value, searchInput.value);
      });

      searchInput.addEventListener("input", () => {
        showComics(genreSelect.value, searchInput.value);
      });
    });
});
