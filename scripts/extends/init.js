// Dropdown category list
const dropdownCategoryList = document.querySelector("#dropdown-category");

// Setting option
const keySettingOption = "key_setting_option";
const storageSettingOption = getFromStorage(keySettingOption);

// Default option
const defaultOption = {
  lang: "en",
  topic: "news",
  page_size: 6,
};
const settingOption =
  storageSettingOption.length == 0 ? defaultOption : storageSettingOption;

// Search option
const keySearchOption = "key_search_option";
const storageSearchOption = getFromStorage(keySearchOption);

// Item to dropdown element
const itemToDropdownEl = (item, index) =>
  `<li><a href="#" code=${item.code} class="dropdown-item mb-2 mb-md-0">${item.name}</a></li>`;

// Render dropdown category list
renderList(topics, itemToDropdownEl, dropdownCategoryList);

// Add event listener for dropdown item
dropdownCategoryList.addEventListener("click", function (e) {
  e.preventDefault();
  // Check
  if (e.target.tagName != "A") return;
  // Change option
  settingOption.topic = e.target.getAttribute("code");
  saveToStorage(keySettingOption, settingOption);
  // Move to category page
  document.location.href = "/pages/category.html";
});
