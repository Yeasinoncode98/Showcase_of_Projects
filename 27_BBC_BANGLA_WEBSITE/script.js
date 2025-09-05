// https://news-api-fs.vercel.app/

//fetch
// 4777 9200 0283 3517
//promise -> pending , resolve, reject(error)

const categoryContainer = document.getElementById("CategoryContainer");
const newsContainer = document.getElementById("newsContainer"); // ✅ Fix

const loadCategory = () => {
  fetch("https://news-api-fs.vercel.app/api/categories") //promise return
    .then((res) => res.json()) //response
    .then((data) => {
      const categories = data.categories;
      showCategory(categories); // ✅ Pass categories properly

      // ✅ Select MAIN by default after categories load
      const mainLi = document.getElementById("main");
      if (mainLi) {
        mainLi.classList.add("border-b-4", "border-red-600");
        loadNewsByCategory("main");
      }
    })
    .catch((err) => console.log(err));
};

// show category
const showCategory = (categories) => {
  categories.forEach((cat) => {
    categoryContainer.innerHTML += `
      <li id="${cat.id}" 
          class="hover:border-b-4 hover:border-red-600 border-red-600 cursor-pointer">
          ${cat.title}
      </li>`;
  });

  categoryContainer.addEventListener("click", (e) => {
    const allLi = document.querySelectorAll("#CategoryContainer li");

    allLi.forEach((li) => {
      li.classList.remove("border-b-4");
    });

    if (e.target.localName === "li") {
      loadNewsByCategory(e.target.id);
      e.target.classList.add("border-b-4");
    }
  });
};

// .....................................
// load news by category

const loadNewsByCategory = (categoryId) => {
  console.log(categoryId);
  fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.articles);
      showNewsbycategory(data.articles);
      // TODO: show news in newsContainer
    })
    .catch((err) => {
      console.log(err);
    });
};

// showNewsbyCategory

const showNewsbycategory = (articles) => {
  newsContainer.innerHTML = "";
  articles.forEach((article) => {
    newsContainer.innerHTML += `
    
        <div class="border border-gray-300 p-5 rounded-lg">
            <div>
                <img src="${article.image.srcset[5].url}" alt="" class="w-full">
            </div>
            <h1 class="mt-3 font-extra-bold">${article.title}</h1>
            <p class="mt-2 text-sm">${article.time}</p>
        </div>
    `;
  });
};

loadCategory();
loadNewsByCategory("main");
