let data_container = document.getElementById("data_container");
let navbar = document.querySelectorAll("li");
let errorMessage = document.getElementById("error");

const newsData = (value) => {
  LatestNews.innerHTML = value;
  const options = { method: "GET" };

  fetch(
    `https://newsapi.org/v2/top-headlines?country=in&category=${value}&apiKey=eae57fac91c04890b3e429efe6095ab1`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      ihtml = "";
      data.articles.map((item) => {
        console.log(item);
        if (item.urlToImage === null) {
          item.urlToImage =
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
        }

        ihtml += `<div class="card mx-2 my-2" style="width: 18rem;">
          <img src=${
            item.urlToImage
          }  class="card-img-top" style="height: 12rem;"  alt="..." >
          <p class= "position-absolute mb-4"> <span class="badge badge-danger">${
            item.source.name
          }</span></p>
         
          <div class="card-body">
          <h5 class="card-title">${item.title.substr(0, 60)}</h5>
          <p class="card-text">${item.publishedAt.toString()}</p>
          <a href=${item.url} class="btn-sm btn-success">read more..</a>
         </div>
          </div>
      `;

        data_container.innerHTML = ihtml;
      });
    }).catch((error)=>{
      errorMessage.innerHTML = "Not found !"

    })
}

Array.from(navbar).forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    newsData(e.target.innerHTML);
    console.log();
  });
})

newsData("Business");
