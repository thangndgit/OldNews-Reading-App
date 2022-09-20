// HTML element
const crsIndicators = document.querySelector(
  "#carousel-news .carousel-indicators"
);
const crsItemsList = document.querySelector("#carousel-news .carousel-inner");
const pagination = document.querySelector("#news-pagination .pagination");
const newsScroll = document.getElementById("news-area-scroll");
const newsList = document.querySelector("#news-area .news-item-list");
const categoryList = document.querySelector("#category-list ul");
const languageList = document.querySelector("#language-list ul");
const loadingOverlay = document.querySelector("#loading-overlay");
const searchForm = document.querySelector("#search-field form");
const confirmBtn = document.querySelector("#confirm-modal .btn-confirm-modal");

// States
const pageState = { page: 1 };
const newsState = {};
const addState = {};

// Get fetch url
const getInterestUrl = () =>
  `https://api.newscatcherapi.com/v2/latest_headlines?${paramsToStr(
    settingOption
  )}&page=${pageState.page}`;

const getLatestUrl = () =>
  `https://api.newscatcherapi.com/v2/latest_headlines?lang=${settingOption.lang}&page_size=100&page=1`;

const getInterestNewsHandler = (data) => {
  // News arr
  const newsArr = removeDuplicate(data.articles || []);
  newsState.news = newsArr;
  // Total page
  const totalPage = Math.min(
    data.total_pages,
    Math.ceil(100 / settingOption.page_size)
  );
  // Render news
  renderNews(newsArr, "", "Add to favorite", newsList);
  // Render news pagination
  renderPagination(pageState.page, totalPage, pagination);
  // Set active
  const activeCategory = categoryList.querySelector(
    `[code="${settingOption.topic}"]`
  );
  const activeLanguage = languageList.querySelector(
    `[code="${settingOption.lang}"]`
  );
  if (!activeCategory.classList.contains("active"))
    activeCategory.classList.add("active");
  if (!activeLanguage.classList.contains("active"))
    activeLanguage.classList.add("active");
  // Scroll in top
  scrollToEl(newsScroll);
  // Hide overlay
  loadingOverlay.classList.add("d-none");
};

// Get news handler
const getLatestNewsHandler = (data) => {
  // News arr
  const newsArr = removeDuplicate(data.articles || []).slice(0, 2);
  // Render carousel
  renderCarousel(newsArr, crsIndicators, crsItemsList);
};

// Fetch news
const fetchInterest = () => {
  // Show overlay
  loadingOverlay.classList.remove("d-none");
  fetchNews(getInterestUrl(), 0, getInterestNewsHandler);
};

const fetchLatest = () => {
  fetchNews(getLatestUrl(), 1, getLatestNewsHandler);
};

// Fetch
fetchInterest();
fetchLatest();
clearObj(storageSearchOption);

// Item to element
const itemToEl = (item, index) =>
  `<li><a href="#" code=${item.code}>${item.name}</a></li>`;

// Render category list
renderList(topics, itemToEl, categoryList, true);

// Render language list
renderList(languages, itemToEl, languageList, true);

// Add event listener for pagination
pagination.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("page-link")) {
    // Page number
    const pageNum = e.target.getAttribute("page-num");
    // Check
    if (e.target.classList.contains("active")) return;
    if (pageNum == "...") return;
    // Up date page state
    pageState.page = +pageNum;
    // Fetch news
    fetchInterest();
    // Scroll in top
    scrollToEl(newsScroll);
  }
});

// Add event listener for category list
categoryList.addEventListener("click", function (e) {
  e.preventDefault();

  // Check
  if (e.target.tagName != "A") return;
  if (e.target.classList.contains("active")) return;

  // Toggle class active
  this.querySelectorAll("A").forEach((el) => el.classList.remove("active"));
  e.target.classList.add("active");
  pageState.page = 1;
  settingOption.topic = e.target.getAttribute("code");
  saveToStorage(keySettingOption, settingOption);
  fetchInterest();
});

// Add event listener for language list
languageList.addEventListener("click", function (e) {
  e.preventDefault();

  // Check
  if (e.target.tagName != "A") return;
  if (e.target.classList.contains("active")) return;

  // Toggle class active
  this.querySelectorAll("A").forEach((el) => el.classList.remove("active"));
  e.target.classList.add("active");
  pageState.page = 1;
  settingOption.lang = e.target.getAttribute("code");
  saveToStorage(keySettingOption, settingOption);
  fetchInterest();
});

// Add event listener for search form
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // Check
  const searchVal = searchForm.querySelector("input").value.trim();
  if (!searchVal) {
    alert("You must enter a keyword!", "danger");
    return;
  }
  // Set search option
  saveToStorage(keySearchOption, { q: searchVal });
  window.location.href = "./pages/search.html";
});

// Add event listener for news list
newsList.addEventListener("click", function (e) {
  // Check
  if (!e.target.classList.contains("news-item__add-btn")) return;
  e.preventDefault();
  addState.add = newsState.news[+e.target.getAttribute("news-id")];
});

// Add event listener for confirm modal button
confirmBtn.addEventListener("click", function (e) {
  e.preventDefault();
  favoriteNews.unshift(addState.add);
  saveToStorage(keyFavoriteNews, favoriteNews);
});
