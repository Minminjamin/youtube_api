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

    let text = "beef-lettuce-tomato";
    text = text
      .split("-") //배열 분리의 기준값
      .map((el) => el.charAt(0).toUpperCase() + el.slice(1)) //분리된 문자값을 반복될면서 첫번째 글자만 대문자 변경 + 나머지 문자 이어붙이기
      .join(" "); //각 단어들을 빈칸으로 합치기

    console.log(text);
    json.items.map((data) => {
      let desc = data.snippet.description;
      let date = data.snippet.publishedAt.split("T")[0];

      date = date.split("-").join(".");
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
          <span>${date}</span>
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
