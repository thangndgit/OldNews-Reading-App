// Upper first case of string
const toUpperFirstCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Format date to ddmmyyyy
const ddmmyyyy = (str) => {
  const date = new Date(str);
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const yyyy = date.getFullYear();

  return [(dd > 9 ? "" : "0") + dd, (mm > 9 ? "" : "0") + mm, yyyy].join("-");
};
