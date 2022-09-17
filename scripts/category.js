// HTML element
const pagination = document.querySelector("#news-pagination .pagination");
const newsTitle = document.querySelector("#news-area .section-title");
const newsScroll = document.getElementById("news-area-scroll");
const newsList = document.querySelector("#news-area .news-item-list");
const categoryList = document.querySelector("#category-list ul");
const languageList = document.querySelector("#language-list ul");
const loadingOverlay = document.querySelector("#loading-overlay");
const searchForm = document.querySelector("#search-field form");

// Page state
const pageState = { page: 1 };

// Get fetch url
const getInterestUrl = () =>
  `https://api.newscatcherapi.com/v2/latest_headlines?${paramsToStr(
    settingOption
  )}&page=${pageState.page}`;

// Get interest news handler
const getInterestNewsHandler = (data) => {
  // News arr
  const newsArr = removeDuplicate(data.articles || []);
  // Render news
  renderNews(newsArr, "", newsList);
  // Render news pagination
  renderPagination(pageState.page, data.total_pages, pagination);
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
  // Change title
  newsTitle.textContent = `All headlines - ${toUpperFirstCase(
    settingOption.topic
  )}`;
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

// Fetch
fetchInterest();
clearObj(storageSearchOption);

// Item to element
const itemToEl = (item) =>
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
  window.location.href = "../pages/search.html";
});
