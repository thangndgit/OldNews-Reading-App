// Upper first case of string
const toUpperFirstCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Date formatter
const ddmmyyyy = (dd, mm, yyyy, connector) =>
  [(dd > 9 ? "" : "0") + dd, (mm > 9 ? "" : "0") + mm, yyyy].join(connector);

const yyyymmdd = (dd, mm, yyyy, connector) =>
  [yyyy, (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join(connector);

// Format date
const formatDate = (date, format, connector) => {
  // Get day, month, year
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  // Combine
  return format(dd, mm, yyyy, connector);
};

// Get date of n days ago
const getPassDate = (passed, currentDate = new Date()) =>
  new Date(currentDate - passed * 24 * 3600 * 1000);

// Check if value is falsy
const isFalsy = (val) => {
  return !val;
};

// Params to string
const paramsToStr = (params) => new URLSearchParams(params).toString();

// Clear object
const clearObj = (obj) => Object.keys(obj).forEach((key) => delete obj[key]);

// Remove duplicate title in object array
const removeDuplicate = (arr) => {
  const uniqueTitle = [];
  const uniqueArr = arr.filter((ele) => {
    const isUnique = !uniqueTitle.includes(ele.title);
    if (isUnique) {
      uniqueTitle.push(ele.title);
      return true;
    }
    return false;
  });
  return uniqueArr;
};

// Smooth scroll to element
const scrollToEl = (el) => el.scrollIntoView({ behavior: "smooth" });
