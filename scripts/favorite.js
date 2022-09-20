// HTML element
const pagination = document.querySelector("#news-pagination .pagination");
const newsTitle = document.querySelector("#news-area .section-title");
const newsScroll = document.getElementById("news-area-scroll");
const newsList = document.querySelector("#news-area .news-item-list");
const loadingOverlay = document.querySelector("#loading-overlay");
const confirmBtn = document.querySelector("#confirm-modal .btn-confirm-modal");

// States
const pageState = { page: 1 };
const newsState = {};
const removeState = {};

// Render favorite news
const renderFavorite = () => {
  const len = favoriteNews.length;
  newsTitle.textContent = `Favorite news - ${len} news saved`;
  if (len === 0) return;
  const favoriteChunks = arrToChunks(favoriteNews, 12);
  console.log(favoriteChunks[pageState.page - 1]);
  renderNews(
    favoriteChunks[pageState.page - 1],
    "col-md-6",
    "Remove from favorite",
    newsList
  );
  console.log(pageState.page, favoriteChunks.length, pagination);
  renderPagination(pageState.page, favoriteChunks.length, pagination);
};

renderFavorite();

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
    pageState.page = pageNum;
    // Render favorite
    renderFavorite();
    // Scroll in top
    scrollToEl(newsScroll);
  }
});

// Add event listener for news list
newsList.addEventListener("click", function (e) {
  // Check
  if (!e.target.classList.contains("news-item__add-btn")) return;
  e.preventDefault();
  removeState.remove =
    (pageState.page - 1) * 12 + +e.target.getAttribute("news-id");
});

// Add event listener for confirm modal button
confirmBtn.addEventListener("click", function (e) {
  e.preventDefault();
  favoriteNews.splice(removeState.remove, 1);
  saveToStorage(keyFavoriteNews, favoriteNews);
  renderFavorite();
});
