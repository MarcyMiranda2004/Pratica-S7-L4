const apiKey = "zzrNmOeCU1D9qEcZKctKkA6GHJ713PhGezM10xG9I1uNpM9gcCaysZOL";
const gallery = document.querySelector(".album .container .row");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const loadImagesButton = document.querySelector(".btn.btn-primary");
const loadSecondaryImagesButton = document.querySelector(".btn.btn-secondary");

async function fetchImages(query) {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${query}`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  );
  const data = await response.json();
  return data.photos;
}

function renderImages(photos) {
  gallery.innerHTML = "";
  photos.forEach((photo) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
            <div class="card shadow-sm mb-4">
                <img src="${photo.src.medium}" class="card-img-top" data-id="${photo.id}" />
                <div class="card-body">
                    <h5 class="card-title" data-id="${photo.id}">${photo.photographer}</h5>
                    <p class="card-text">Photo by ${photo.photographer}</p>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="btn-group">
                            <button type="button" class="btn btn-outline-secondary btn-sm view-btn" data-id="${photo.id}">View</button>
                            <button type="button" class="btn btn-outline-danger btn-sm hide-btn">Hide</button>
                        </div>
                        <small class="text-muted">${photo.id}</small>
                    </div>
                </div>
            </div>
        `;
    gallery.appendChild(col);
  });
}

gallery.addEventListener("click", (event) => {
  if (event.target.classList.contains("hide-btn")) {
    event.target.closest(".col-md-4").remove();
  }
  if (
    event.target.classList.contains("view-btn") ||
    event.target.tagName === "IMG" ||
    event.target.tagName === "H5"
  ) {
    const photoId = event.target.dataset.id;
    window.location.href = `detail.html?id=${photoId}`;
  }
});

loadImagesButton.addEventListener("click", async () => {
  const images = await fetchImages("mountains");
  renderImages(images);
});

loadSecondaryImagesButton.addEventListener("click", async () => {
  const images = await fetchImages("kittens");
  renderImages(images);
});

searchButton.addEventListener("click", async () => {
  const query = searchInput.value;
  if (query) {
    const images = await fetchImages(query);
    renderImages(images);
  }
});
