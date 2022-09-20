// HTML element
const pagination = document.querySelector("#news-pagination .pagination");
const newsTitle = document.querySelector("#news-area .section-title");
const newsScroll = document.getElementById("news-area-scroll");
const newsList = document.querySelector("#news-area .news-item-list");
const loadingOverlay = document.querySelector("#loading-overlay");
const confirmBtn = document.querySelector("#confirm-modal .btn-confirm-modal");

// Input element
const searchForm = document.querySelector("#search-box form");
const searchBtn = document.querySelector("#search-box button");
const inputQ = document.querySelector("#input-q input");
const inputSearchIn = document.querySelector("#input-search-in select");
const inputTopic = document.querySelector("#input-category select");
const inputSources = document.querySelector("#input-source input");
const inputLanguage = document.querySelector("#input-language select");
const inputCountries = document.querySelector("#input-country select");
const inputRankedOnly = document.querySelector("#input-ranked-only select");
const inputFromRank = document.querySelector("#input-from-rank input");
const inputToRank = document.querySelector("#input-to-rank input");
const inputSortBy = document.querySelector("#input-sort-by select");
const inputFromDate = document.querySelector("#input-from-date input");
const inputToDate = document.querySelector("#input-to-date input");

// Search option
const searchOption = {};

// States
const pageState = { page: 1 };
const newsState = {};
const addState = {};

// Render input select option
const itemToOptionEl = (item) =>
  `<option value="${item.code}">${item.name}</option>`;
renderList(topics, itemToOptionEl, inputTopic, false);
renderList(languages, itemToOptionEl, inputLanguage, false);
renderList(countries, itemToOptionEl, inputCountries, false);
inputFromDate.min = formatDate(getPassDate(30), yyyymmdd, "-");
inputFromDate.max = formatDate(new Date(), yyyymmdd, "-");
inputFromDate.value = formatDate(getPassDate(30), yyyymmdd, "-");
inputToDate.min = formatDate(getPassDate(30), yyyymmdd, "-");
inputToDate.max = formatDate(new Date(), yyyymmdd, "-");
inputToDate.value = formatDate(new Date(), yyyymmdd, "-");

// Get fetch url
const getInterestUrl = () =>
  `https://api.newscatcherapi.com/v2/search?${paramsToStr(
    searchOption
  )}&page_size=12&page=${pageState.page}`;

// Get interest news handler
const getInterestNewsHandler = (data) => {
  // News arr
  const newsArr = data.articles || [];
  newsState.news = newsArr;
  // Render news
  renderNews(newsArr, "col-md-6", "Add to favorite", newsList);
  // Render news pagination
  renderPagination(pageState.page, data.total_pages, pagination);
  // Change title
  newsTitle.textContent = `${data.total_hits} results found`;
  // Scroll in top
  scrollToEl(newsScroll);
  // Hide overlay
  loadingOverlay.classList.add("d-none");
};

// Fetch news
const fetchInterest = () => {
  // Show overlay
  loadingOverlay.classList.remove("d-none");
  fetchNews(getInterestUrl(), 0, getInterestNewsHandler);
};

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

// Add event listener for form submit
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // Validate
  if (!inputQ.value.trim()) {
    alert("You must enter at least a keyword!", "danger");
    return;
  }
  // Get option from input
  const q = inputQ.value.trim();
  const search_in = inputSearchIn.value;
  const topic = inputTopic.value;
  const sources = inputSources.value.trim();
  const lang = inputLanguage.value;
  const countries = inputCountries.value;
  const ranked_only = inputRankedOnly.value;
  const from_rank = inputFromRank.value;
  const to_rank = inputToRank.value;
  const sort_by = inputSortBy.value;
  const from = inputFromDate.value;
  const to = inputToDate.value;
  // Set option
  clearObj(searchOption);
  searchOption.q = q;
  if (search_in) searchOption.search_in = search_in;
  if (topic) searchOption.topic = topic;
  if (sources) searchOption.sources = sources;
  if (lang) searchOption.lang = lang;
  if (countries) searchOption.countries = countries;
  if (ranked_only) searchOption.ranked_only = ranked_only;
  if (from_rank) searchOption.from_rank = from_rank;
  if (to_rank) searchOption.to_rank = to_rank;
  if (sort_by) searchOption.sort_by = sort_by;
  if (from) searchOption.from = from;
  if (to) searchOption.to = to;
  console.log(searchOption);
  // Fetch news
  pageState.page = 1;
  fetchInterest();
});

// Search default
if (storageSearchOption.length != 0) {
  clearObj(searchOption);
  searchOption.q = storageSearchOption.q;
  inputQ.value = storageSearchOption.q;
  removeFromStorage(keySearchOption);
  fetchInterest();
}

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
