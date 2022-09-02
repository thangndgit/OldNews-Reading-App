// Get pagination element
const pagination = document.querySelector(".pagination");

// Render pagination
const renderPagination = (currentPage, totalPage) => {
  // Array store pagination number must display
  let pageTokens;
  // Push valid item to array
  if (totalPage == 1) pageTokens = [1];
  else if (totalPage == 2) pageTokens = [1, 2];
  else if (totalPage == 3) pageTokens = [1, 2, 3];
  else {
    pageTokens = [currentPage - 1, currentPage, currentPage + 1];
    // Remove invalid item
    pageTokens = pageTokens.filter((token) => token >= 1 && token <= totalPage);
    // Add head
    if (pageTokens[0] != 1) {
      if (pageTokens[0] > 2) pageTokens.unshift(1, "...");
      else pageTokens.unshift(1);
    }
    // Add tail
    if (pageTokens[pageTokens.length - 1] != totalPage) {
      if (pageTokens[pageTokens.length - 1] < totalPage - 1)
        pageTokens.push("...", totalPage);
      else pageTokens.push(totalPage);
    }
  }

  // Render pagination
  pagination.innerHTML = "";
  pageTokens.forEach((token) => {
    pagination.innerHTML += `
      <li class="page-item">
      <a class="page-link ${
        token == currentPage ? "active" : ""
      }" href="#">${token}</a>
      </li>
    `;
  });
};
