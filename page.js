let home = document.querySelector(".body-news").innerHTML;
let news_body = document.querySelector(".body-news");

let remove = i => {
  news_body.innerHTML = "";
  news_body.style.marginTop = "26px";
  if (i === 1) {
    news_body.innerHTML = "";
    news_body.innerHTML = home;
  }
};

let BgColor = [
  "warning",
  "primary",
  "secondary",
  "success",
  "info",
  "dark",
  "danger"
];

// break;

async function pageNews(topic) {
  let url = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=Vw1t790RT5yLalH8YDrpO4kTtQlfyGiM`;
  let responce = await fetch(url);
  let data = await responce.json();

  data.results.forEach(item => {
    let pageNews = document.createElement("div");
    pageNews.className = "mb-3 mx-3 bg-white rounded  pageNews   ";
    news_body.appendChild(pageNews);

    let newsCard = document.createElement("div");
    newsCard.className = "row g-0";
    pageNews.appendChild(newsCard);

    let cardImg = document.createElement("div");
    cardImg.className = "col-md-4 cardImg";
    newsCard.appendChild(cardImg);

    let img = document.createElement("img");
    img.className = "img-fluid rounded";
    img.src = `${item.multimedia[0].url}`; //
    img.alt = "News_Image";
    cardImg.appendChild(img);
    // --------------- badge ----------
    let color = BgColor[Math.floor(Math.random() * BgColor.length)];

    let midle_card_badge = document.createElement("div");
    midle_card_badge.className = `badge bg-${color}`;
    cardImg.appendChild(midle_card_badge);
    //  --------
    let ico = document.createElement("i");
    ico.className = "fas fa-circle  me-2 small fw-bold";
    ico.innerText = `    ${item.section}`;
    midle_card_badge.appendChild(ico);
    // ----------------
    let cardBody = document.createElement("div");
    cardBody.className = "col-md-8";
    newsCard.appendChild(cardBody);

    let cardInner = document.createElement("div");
    cardInner.className = "card-body";
    cardBody.appendChild(cardInner);

    let link = document.createElement("a");
    link.href = `${item.url}`;

    let h5 = document.createElement("h5");
    h5.innerHTML = `${item.title}`; //
    link.appendChild(h5);

    let p = document.createElement("p");
    p.innerText = `${item.abstract}`; //

    cardInner.append(link, p);
  });
}
