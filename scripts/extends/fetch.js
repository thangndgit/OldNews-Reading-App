// Newscatcher API v1
// const apiKey = "2c290567f1msh4254a9faad07921p1cb2fdjsndbf361b87660";
// const apiKey = "da134eb65emshe40e8e13451f1d6p1e9860jsn9ecc557d916f";
// const apiHost = "newscatcher.p.rapidapi.com";
// const fetchOptions = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": apiKey,
//     "X-RapidAPI-Host": apiHost,
//   },
// };

// Newscatcher API v2
const apiKey = [
  "nh-uduGo4eGAX7AFPg4wZRqFl2HJt8hJEItfrpatDeM",
  "qKC1khtDw__zotge_koxRStLPc8sBefV5LAFYo4RiRc",
];

// Get the news from api
const fetchNews = (url, keyId, processNews) => {
  // Fetch option
  const fetchOptions = {
    method: "GET",
    headers: {
      "x-api-key": apiKey[keyId],
    },
  };
  // Fetch news
  fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      processNews(data);
      console.log(url);
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
      alert(err, "danger");
    });
};
