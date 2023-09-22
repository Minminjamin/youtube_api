const frame = document.querySelector("section");
const YOUTUBE_API_KEY = "AIzaSyAWxGBPSbD77v0zph1g-avF18Tv5Cqt3Mk";
const BASE_URL = " https://www.googleapis.com/youtube/v3/playlistItems";
const pid = "PLNXichiUWg4AMRZ2o73mjBIvA2f5Pi6-4";

const num = 5;
const tit_len = 50;
const desc_len = 180;
const resultURL = `${BASE_URL}?key=${YOUTUBE_API_KEY}&part=snippet&playlistId=${pid}&maxResults=${5}`;

fetch(resultURL)
  .then((data) => data.json())
  .then((json) => {
    let tags = "";

    json.items.map((data) => {
      let desc = data.snippet.description;
      desc.length > desc_len ? (desc = desc.substr(0, desc_len) + "...") : desc;

      //날자값 가공
      let date = data.snippet.publishedAt.split("T")[0];
      date = date.split("-").join(".");

      tags += `
				<article>
					<h2>${
            data.snippet.title.length > tit_len
              ? data.snippet.title.substr(0, tit_len) + "..."
              : data.snippet.title
          }</h2>
					<div class='txt'>
						<p>${desc}</p>
						<span>${date}</span>
					</div>
					<div class='pic'>
						<img src='${data.snippet.thumbnails.standard.url}' />
					</div>					
				</article>
			`;
    });

    frame.innerHTML = tags;
  });
// console.log(resultURL);
