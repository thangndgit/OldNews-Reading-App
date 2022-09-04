// X-RapidAPI-Key and X-RapidAPI-Host
// const apiKey = "da134eb65emshe40e8e13451f1d6p1e9860jsn9ecc557d916f";
const apiKey = "2c290567f1msh4254a9faad07921p1cb2fdjsndbf361b87660";
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
const keyOption = "key_option";
const storageOption = getFromStorage(keyOption);
const defaultOption = {
  query: "",
  lang: "en",
  topic: "news",
  pageSize: 5,
};
const option = storageOption.length == 0 ? defaultOption : storageOption;

// Carousel elements
const crsIndicators = document.querySelector(
  "#carousel-news .carousel-indicators"
);
const crsInner = document.querySelector("#carousel-news .carousel-inner");

// HTML element
const newsTitle = document.querySelector("#news-area .section-title");
const newsItemList = document.querySelector("#news-area .news-item-list");
const categoryList = document.querySelector("#category-list ul");
const languageList = document.querySelector("#language-list ul");
const loadingOverlay = document.querySelector("#loading-overlay");

// Latest news
const latestNews = [];
const interestNews = [];

// Render carousel
const renderCarousel = (newsArr) => {
  // Set latest headlines to carousel
  crsIndicators.innerHTML = `
    <button type="button" data-bs-target="#carousel-news" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    `;
  crsInner.innerHTML = `
    <div class="carousel-item active" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('${
      isFalsy(newsArr[0].media) ? "./images/no-image.jpg" : newsArr[0].media
    }')">
    <div class="carousel-caption">
    <h5><a href="${newsArr[0].link}" target="_blank" class="link--white">${
    newsArr[0].title
  }</a></h5>
    <p class="mt-4">
    ${newsArr[0].summary}
    </p>
    </div>
    </div>
    `;

  for (let i = 1; i < 10; i++) {
    // Set indicators
    crsIndicators.innerHTML += `
      <button type="button" data-bs-target="#carousel-news" data-bs-slide-to="${i}" aria-label="Slide ${
      i + 1
    }"></button>
      `;
    // Set items
    crsInner.innerHTML += `
      <div class="carousel-item" target="_blank" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('${
        isFalsy(newsArr[i].media) ? "./images/no-image.jpg" : newsArr[i].media
      }')">
      <div class="carousel-caption">
      <h5><a href="${newsArr[i].link}" target="_blank" class="link--white">${
      newsArr[i].title
    }</a></h5>
      <p class="mt-4">
      ${newsArr[i].summary}
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
    style="background: url('${
      isFalsy(newsArr[firstIndex].media)
        ? "./images/no-image.jpg"
        : newsArr[firstIndex].media
    }')"
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
    style="background: url('${
      isFalsy(newsArr[i].media) ? "./images/no-image.jpg" : newsArr[i].media
    }')"
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
  // Change title
  newsTitle.textContent = `Lastest headlines - ${toUpperFirstCase(
    option.topic
  )}`;
  // Scroll in top
  document
    .getElementById("news-area-scroll")
    .scrollIntoView({ behavior: "smooth" });
};

// Get latest news and render carousel
fetch(
  `https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=news&lang=${option.lang}&media=True`,
  fetchOptions
)
  .then((response) => response.json())
  .then((data) => {
    latestNews.push(...data.articles);
    console.log(latestNews);
    renderCarousel(latestNews);
  })
  .catch((err) => {
    console.error(err);
    alert(err, "danger");
  });

// Get interest news and render news
const fetchInterest = () => {
  loadingOverlay.classList.remove("d-none");
  fetch(
    `https://newscatcher.p.rapidapi.com/v1/latest_headlines?topic=${option.topic}&lang=${option.lang}&media=True`,
    fetchOptions
  )
    .then((response) => response.json())
    .then((data) => {
      interestNews.length = 0;
      interestNews.push(...data.articles);
      console.log(interestNews);
      renderNews(interestNews, 1, option.pageSize);
      loadingOverlay.classList.add("d-none");
    })
    .catch((err) => {
      console.error(err);
      alert(err, "danger");
    });
};

fetchInterest();

// Add event listener for pagination
pagination.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("active") && e.target.textContent != "...") {
    renderNews(interestNews, +e.target.textContent, option.pageSize);
  }
});

// Add event listener for category list
categoryList.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.tagName == "A") {
    option.topic = e.target.textContent.toLowerCase();
    saveToStorage(keyOption, option);
    fetchInterest();
  }
});

// Add event listener for language list
languageList.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.tagName == "A") {
    option.lang = e.target.textContent.toLowerCase().slice(-2);
    saveToStorage(keyOption, option);
    fetchInterest();
  }
});
