const frame = document.querySelector("section");

const YOUTUBE_API_KEY = "AIzaSyAWxGBPSbD77v0zph1g-avF18Tv5Cqt3Mk";
const BASE_URL = " https://www.googleapis.com/youtube/v3/playlistItems";
const pid = "PLNXichiUWg4AMRZ2o73mjBIvA2f5Pi6-4";

const num = 5;
const tit_let = 50;

const resultURL = `${BASE_URL}?key=${YOUTUBE_API_KEY}&part=snippet&playlistId=${pid}&maxResults=${5}`;

fetch(resultURL)
  .then((data) => data.json())
  .then((json) => {
    let tags = "";

    json.items.map((data) => {
      let desc = data.snippet.description;

      desc.length > 120 ? (desc = desc.substr(0, 120) + "...") : desc;

      tags += `
      <article>
        <h2>${
          data.snippet.title.length > tit_let
            ? data.snippet.title.substr(0, tit_let) + "..."
            : data.snippet.title
        }</h2>
        <div class="text">
          <p>${desc}</p>
          <span>${data.snippet.publishedAt}</span>
        </div>
        <div class="pic">
          <img src='${data.snippet.thumbnails.standard.url}'/>
        </pic>
      </article>
      `;
    });

    frame.innerHTML = tags;
  });
// console.log(resultURL);
