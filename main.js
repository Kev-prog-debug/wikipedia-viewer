// get html elements
let search = document
  .querySelector("#search")
  .addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  let input = document.querySelector("input").value;
  fetchWiki(input);
}
function fetchWiki(input) {
  fetch(
    `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${input}&limit=30&format=json`
  )
    .then((res) => res.json())
    .then(([, titles, , links]) => {
      //combine two different arrays
      let articles = [];
      for (let i = 0; i < titles.length; i++) {
        articles.push({ title: titles[i], link: links[i] });
      }
      renderArticles(articles);
    })
    .catch((err) => console.error("Error", err));
}

function renderArticles(articles) {
  //get <ul/> element from document
  const list = document.querySelector("#articles");
  list.innerHTML = "";
  //create new <li/> element
  articles.forEach((article) => {
    const li = document.createElement("li");
    li.setAttribute("class", "article");
    //create <a/> element and append to the <li/>
    const anchor = document.createElement("a");
    anchor.setAttribute("href", `${article.link}`);
    anchor.setAttribute("target", "_blank");
    anchor.innerHTML = article.title;
    //append <a/> element to <li/>
    li.appendChild(anchor);
    //append <li/> to <ul/>
    list.appendChild(li);
  });
}
