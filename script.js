let topic;
let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let topicArr = [
  "",
  "travel",
  "technology",
  "sports",
  "arts",
  "health",
  "well",
  "world",
  "food",
  "fashion",
  "magazine"
];
let bgColor = [
  "warning",
  "primary",
  "secondary",
  "success",
  "info",
  "dark",
  "danger"
];

// break;

let GetData = () => {
  num.forEach(i => {
    topic = topicArr[i];

    async function getData() {
      let url = `https://api.nytimes.com/svc/topstories/v2/${topic}.json?api-key=Vw1t790RT5yLalH8YDrpO4kTtQlfyGiM`;
      let responce = await fetch(url);
      let data = await responce.json();
      let result = data.results.map(item => item);

      //   --------------- color ----------->
      let color = bgColor[Math.floor(Math.random() * bgColor.length)];

      let mydate = new Date();
      // ------------ Date -------->
      let value = `${result[0].published_date}`;

      const [date, year] = [mydate.getDate(value), mydate.getFullYear(value)];

      const formatter = new Intl.DateTimeFormat("en", { month: "short" });
      const month = formatter.format(new Date(value));

      // ---------
      const published_date = document.createElement("span");
      published_date.className = "badge text-white date";
      published_date.innerText = `${month} ${date}, ${year}`;

      if (i <= 4) {
        // -------------------------//

        let Card = document.querySelector(`.box-${i}`);
        Card.style.cssText += `background-image: url(${result[0].multimedia[0].url})`;

        let boxinfo = document.querySelector(`.box1-info${i}`);

        let link = document.createElement("a");
        link.href = `${result[0].url}`;
        boxinfo.appendChild(link);

        let badge = document.createElement("div");
        badge.className = `badge text-white bg-${color}`;

        let a = document.createElement("a");
        badge.appendChild(a);

        let ico = document.createElement("i");
        ico.className = "fas fa-circle  me-2 small fw-bold";
        ico.innerText = `    ${result[0].section}`;
        a.appendChild(ico);

        let title = document.createElement("h4");
        title.className = "card-title";
        title.innerText = `${result[0].title}`;

        let discription = document.createElement("p");
        discription.innerText = `${result[0].abstract}`;

        let author = document.createElement("span");
        author.className = "me-2 author";
        author.innerText = `${result[0].byline}`;

        link.append(
          badge,
          title,
          i === 1 ? discription : "",
          author,
          published_date
        );
      }

      //   ------------------ midle layer ---------------//
      let hilights = document.querySelector(".bi-hourglass-split");
      hilights.classList.add(`text-${color}`);

      if (i >= 5) {
        //   -------------------

        let midle_news = document.querySelector(".midle-news");

        //   ----------- main card ---------->>>

        let midle_news_cards = document.createElement("div");
        midle_news_cards.className = "card  col-md-2";
        midle_news.appendChild(midle_news_cards);

        //  ---------------- card image ----------------->>>
        let midle_card_img = document.createElement("div");
        midle_card_img.className = `midle-card-img`;
        midle_card_img.style.cssText += `background-image: url(${result[0].multimedia[0].url})`;
        midle_news_cards.appendChild(midle_card_img);
        // ----------- card badge ---------

        let midle_card_badge = document.createElement("div");
        midle_card_badge.className = `badge bg-${color}`;
        midle_card_img.appendChild(midle_card_badge);
        //  --------
        let ico = document.createElement("i");
        ico.className = "fas fa-circle  me-2 small fw-bold";
        ico.innerText = `    ${result[0].section}`;
        midle_card_badge.appendChild(ico);

        // ---------------- card body ----------->>>
        let midle_card_body = document.createElement("div");
        midle_card_body.className = "card-body";
        midle_news_cards.appendChild(midle_card_body);
        // --------------- card head line -------

        let link = document.createElement("a");
        link.href = `${result[0].url}`;

        let head_line = document.createElement("h5");
        head_line.className = "card-title text-dark";
        head_line.innerText = `${result[0].title}`;
        link.appendChild(head_line);
        // --------------- card apstract {p-tag} -----------
        let p = document.createElement("p");
        p.className = "card-text";
        p.innerText = `${result[0].abstract}`;

        //  ----------- author & time -------->

        let author = document.createElement("span");
        author.className = "me-2 author text-secondary";
        author.innerText = `${result[0].byline}`;

        // -----------

        midle_card_body.append(link, p, author, published_date);

        if (num.at(-1) === i) {
          let loadButton = document.querySelector(".loadBtn");
          let loadBtn = document.createElement("div");
          loadBtn.className = "btn mx-auto  btn-primary text-white";
          loadBtn.innerHTML =
            'Load more post <i class="far fa-arrow-alt-circle-down"></i>';
          loadButton.appendChild(loadBtn);
        }
      }
    }

    getData();
  });
};

GetData();
