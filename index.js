// X-RapidAPI-Key and X-RapidAPI-Host
const apiKey = "da134eb65emshe40e8e13451f1d6p1e9860jsn9ecc557d916f";
const apiHost = "newscatcher.p.rapidapi.com";

// Fetch options
const fetchOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": apiHost,
  },
};

// Option
const lang = "en";
const pageSize = 5;

// Carousel elements
const crsIndicators = document.querySelector(
  "#carousel-news .carousel-indicators"
);
const crsInner = document.querySelector("#carousel-news .carousel-inner");

// News item list
const newsItemList = document.querySelector("#news-area .news-item-list");

// Latest headlines
const latestHeadlines = [];

// Render carousel
const renderCarousel = () => {
  // Set latest headlines to carousel
  crsIndicators.innerHTML = `
    <button type="button" data-bs-target="#carousel-news" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    `;
  crsInner.innerHTML = `
    <div class="carousel-item active" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('${latestHeadlines[0].media}')">
    <div class="carousel-caption">
    <h5><a href="${latestHeadlines[0].link}" target="_blank" class="link--white">${latestHeadlines[0].title}</a></h5>
    <p class="mt-4">
    ${latestHeadlines[0].summary}
    </p>
    </div>
    </div>
    `;

  for (let i = 1; i < 5; i++) {
    // Set indicators
    crsIndicators.innerHTML += `
      <button type="button" data-bs-target="#carousel-news" data-bs-slide-to="${i}" aria-label="Slide ${
      i + 1
    }"></button>
      `;
    // Set items
    crsInner.innerHTML += `
      <div class="carousel-item" target="_blank" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('${latestHeadlines[i].media}')">
      <div class="carousel-caption">
      <h5><a href="${latestHeadlines[i].link}" target="_blank" class="link--white">${latestHeadlines[i].title}</a></h5>
      <p class="mt-4">
      ${latestHeadlines[i].summary}
      </p>
      </div>
      </div>
      `;
  }
};

// Render latest headlines
const renderNews = (newsArr, page, pageSize) => {
  // First and last index in current page
  const firstIndex = page * pageSize - pageSize;
  const lastIndex = page * pageSize;
  // Render news item
  newsItemList.innerHTML = `
    <div class="news-item mt-4">
    <div
    class="news-item__img"
    style="background: url('${newsArr[firstIndex].media}')"
    ></div>
    <ul
    class="news-item__info d-inline-flex text-bg-danger gap-4 p-2"
    >
    <li>
    <i class="fa-solid fa-earth-america"></i> ${newsArr[firstIndex].clean_url}
    </li>
    <li><i class="fa-solid fa-tag"></i> ${toUpperFirstCase(
      newsArr[firstIndex].topic
    )}</li>
    <li><i class="fa-solid fa-calendar"></i> ${ddmmyyyy(
      newsArr[firstIndex].published_date
    )}</li>
    </ul>
    <h4 class="news-item__title mt-3">
    <a href="${newsArr[firstIndex].link}" target="_blank" class="link--black"
    >${newsArr[firstIndex].title}</a
    >
    </h4>
    <p class="news-item__description mt-2">
    ${newsArr[firstIndex].summary}
    </p>
    </div>
  `;
  for (let i = firstIndex + 1; i < lastIndex; i++) {
    newsItemList.innerHTML += `
    <div class="news-item mt-5">
    <div
    class="news-item__img"
    style="background: url('${newsArr[i].media}')"
    ></div>
    <ul
    class="news-item__info d-inline-flex text-bg-danger gap-4 p-2"
    >
    <li>
    <i class="fa-solid fa-earth-america"></i> ${newsArr[i].clean_url}
    </li>
    <li><i class="fa-solid fa-tag"></i> ${toUpperFirstCase(
      newsArr[i].topic
    )}</li>
    <li><i class="fa-solid fa-calendar"></i> ${ddmmyyyy(
      newsArr[i].published_date
    )}</li>
    </ul>
    <h4 class="news-item__title mt-3">
    <a href="${newsArr[i].link}" target="_blank" class="link--black"
    >${newsArr[i].title}</a
    >
    </h4>
    <p class="news-item__description mt-2">
    ${newsArr[0].summary}
    </p>
    </div>
    `;
  }
  // Render news pagination
  renderPagination(page, Math.ceil(newsArr.length / pageSize));
};

// Get latest headlines
fetch(
  `https://newscatcher.p.rapidapi.com/v1/latest_headlines?lang=${lang}&media=True`,
  fetchOptions
)
  .then((response) => response.json())
  .then((data) => {
    latestHeadlines.push(...data.articles);
    renderCarousel();
    renderNews(latestHeadlines, 1, pageSize);
  })
  .catch((err) => {
    console.error(err);
    alert(err, "danger");
  });

// Add event listener for pagination
document.querySelector(".pagination").addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("active") && e.target.textContent != "...") {
    renderNews(latestHeadlines, +e.target.textContent, pageSize);
    document.getElementById("news-area").scrollIntoView({ behavior: "smooth" });
  }
});
