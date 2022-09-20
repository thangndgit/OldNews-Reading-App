// Render list
const renderList = (items, itemToEl, elList, reset) => {
  // Render item
  if (reset) elList.innerHTML = "";
  items.forEach((el, index) => (elList.innerHTML += itemToEl(el, index)));
};

// Render carousel
const renderCarousel = (items, elIndicatorsList, elInnersList) => {
  // Indicator HTML
  const itemToIndicatorEl = (el, index) => `
  <button
    type="button"
    data-bs-target="#carousel-news"
    data-bs-slide-to=${index}
    aria-label="Slide ${index + 1}"
  ></button>
  `;

  // Inner item HTML
  const itemToInnerEl = (el, index) => `
  <div
    target="_blank"
    style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url('${
      isFalsy(el.media) ? "./images/no-image.jpg" : el.media
    }')"
    class="carousel-item"
  >
    <div class="carousel-caption">
      <h5>
        <a href=${el.link} target="_blank" class="link--white">
          ${el.title}
        </a>
      </h5>
      <p class="mt-4">${el.summary}</p>
    </div>
  </div>
  `;

  // Render list
  renderList(items, itemToIndicatorEl, elIndicatorsList, true);
  renderList(items, itemToInnerEl, elInnersList, true);

  // Item correction
  elIndicatorsList.querySelector("button").classList.add("active");
  elInnersList.querySelector(".carousel-item").classList.add("active");
};

// Render pagination
const renderPagination = (currentPage, totalPage, elPagination) => {
  // Pagination item
  const items = [];
  // Push valid item to array
  if (totalPage == 0) {
    elPagination.innerHTML = "";
    return;
  } else if (totalPage == 1) items.push(1);
  else if (totalPage == 2) items.push(1, 2);
  else if (totalPage == 3) items.push(1, 2, 3);
  else {
    // Remove invalid item
    items.push(
      ...[currentPage - 1, currentPage, currentPage + 1].filter(
        (item) => item >= 1 && item <= totalPage
      )
    );
    // Add head
    if (items[0] != 1) {
      if (items[0] > 2) items.unshift(1, "...");
      else items.unshift(1);
    }
    // Add tail
    if (items[items.length - 1] != totalPage) {
      if (items[items.length - 1] < totalPage - 1) items.push("...", totalPage);
      else items.push(totalPage);
    }
  }

  // Render handler
  const itemToEl = (item, index) => `
  <li class="page-item">
    <a class="page-link" page-num=${item} href="#">
      ${item}
    </a>
  </li>
  `;

  // Render pagination
  renderList(items, itemToEl, elPagination, true);

  // Item correction
  elPagination
    .querySelector(`a[page-num="${currentPage}"]`)
    .classList.add("active");
};

// Render news
const renderNews = (items, extendClass, btnLbl, elNewsList) => {
  // Render handler
  const itemToEl = (item, index) => `
    <div class="news-item mb-5 ${extendClass}">
      <div
        class="news-item__img"
        style="background: url('${
          isFalsy(item.media) ? "/images/no-image.jpg" : item.media
        }')"
      >
      <button
        class="news-item__add-btn"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal"
        news-id="${index}"
      >
        ${btnLbl}
      </button>
      </div>
      <ul class="news-item__info d-inline-flex text-bg-danger gap-4 p-2">
        <li>
          <i class="fa-solid fa-earth-america"></i> ${item.clean_url}
        </li>
        <li>
          <i class="fa-solid fa-tag"></i> ${toUpperFirstCase(item.topic)}
        </li>
        <li>
          <i class="fa-solid fa-calendar"></i> ${formatDate(
            new Date(item.published_date),
            ddmmyyyy,
            "-"
          )}
        </li>
      </ul>
      <h4 class="news-item__title mt-3">
        <a href="${item.link}" target="_blank" class="link--black">
          ${item.title}
        </a>
      </h4>
      <p class="news-item__description mt-2">${item.summary}</p>
    </div>
  `;

  // Render news
  renderList(items, itemToEl, elNewsList, true);
};
