const YOUTUBE_API_KEY = "AIzaSyAWxGBPSbD77v0zph1g-avF18Tv5Cqt3Mk";
const BASE_URL = " https://www.googleapis.com/youtube/v3/playlistItems";
const pid = "PLNXichiUWg4AMRZ2o73mjBIvA2f5Pi6-4";
const num = 5;

const resultURL = `${BASE_URL}?key=${YOUTUBE_API_KEY}&part=snippet&playlistId=${pid}&maxResults=${5}`;

fetch(resultURL)
  .then((data) => data.json())
  .then((json) => {
    console.log(json.items);
  });
// console.log(resultURL);
