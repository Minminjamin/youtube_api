const frame = document.querySelector("section");
const pic = document.querySelectorAll(".pic");
const YOUTUBE_API_KEY = "AIzaSyAWxGBPSbD77v0zph1g-avF18Tv5Cqt3Mk";
const BASE_URL = " https://www.googleapis.com/youtube/v3/playlistItems";
const pid = "PLNXichiUWg4AMRZ2o73mjBIvA2f5Pi6-4";

const num = 5;
const tit_len = 50;
const desc_len = 180;
const resultURL = `${BASE_URL}?key=${YOUTUBE_API_KEY}&part=snippet&playlistId=${pid}&maxResults=${5}`;

// 이벤트 위임(event delegation)
// 동적으로  생성되는 요소에 이벤트 연결이 불가, 이벤트 연결시점에 해당 돔이 생성되지 않았기 때문
// 항상 있는 body 요소에다가 이벤트를 위임해서 추후 동적 dom이 생기면 이벤트를 전달받도록 처리
window.addEventListener("click", (e) => {
  //e.currentTarget : 이벤트가 연결되어 있는 선택자를 반환
  //e.target : 실제화면상에서 이벤트가 발생한 요소를 반환
  if (e.target.nodeName === "IMG") createPop(e.target.getAttribute("data-vid"));
  if (e.target.className === "close") removePop();
  // if (e.target.nodeName === "SPAN") {
  //   console.log("You clicked span");
  // }
});

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
					<img src='${data.snippet.thumbnails.standard.url}' data-vid=${
        data.snippet.resourceId.videoId
      } />
					</div>					
				</article>
			`;
    });

    frame.innerHTML = tags;
  });

function createPop(id) {
  const aside = document.createElement("aside");

  aside.innerHTML = `
    <div class='con'>
      <iframe src='https://www.youtube.com/embed/${id}'></iframe>
    </div>
    <span class='close'>close</span>
  `;

  document.body.append(aside);
  document.body.style.overflow = "hidden";
}

function removePop() {
  const pop = document.querySelector("aside");
  pop.remove();
  document.body.style.overflow = "auto";
}
