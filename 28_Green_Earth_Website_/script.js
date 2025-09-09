const categoryContainer = document.getElementById("category-container");
const postContainer = document.getElementById("post-container");
const loader = document.getElementById("loader");
let cart = [];

// Show loading
const loading = (status) => {
  if (status) {
    loader.classList.remove("hidden");
    loader.classList.add("flex");
  } else {
    loader.classList.add("hidden");
    loader.classList.remove("flex");
  }
};

// Load Categories
const loadCategory = async () => {
  try {
    const url = "https://openapi.programming-hero.com/api/categories";
    const res = await fetch(url);
    const data = await res.json();
    categoryContainer.innerHTML = "";
    data.categories.forEach((cat) => {
      const li = document.createElement("li");
      li.id = cat.id;
      li.className =
        "hover:bg-green-700 hover:text-white rounded-lg cursor-pointer px-3 py-2 active-li";
      li.textContent = cat.category_name;
      categoryContainer.appendChild(li);
    });
  } catch (err) {
    console.log(err);
  }
};

// Category click
categoryContainer.addEventListener("click", (e) => {
  const allLi = document.querySelectorAll(".active-li");
  allLi.forEach((li) => li.classList.remove("bg-green-700", "text-white"));
  if (e.target.nodeName === "LI") {
    e.target.classList.add("bg-green-700", "text-white");
    const id = e.target.id;
    loading(true);
    plantsByCategory(id);
  }
});

// Fetch all posts
const fetchAllPost = async () => {
  try {
    loading(true);
    const url = "https://openapi.programming-hero.com/api/plants";
    const res = await fetch(url);
    const data = await res.json();
    loadPost(data.plants);
  } catch (err) {
    console.log(err);
  } finally {
    loading(false);
  }
};

// Load posts
const loadPost = (data) => {
  postContainer.innerHTML = "";
  data.forEach((plant) => {
    const div = document.createElement("div");
    div.className =
      "card bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition p-3";
    div.innerHTML = `
      <figure class="overflow-hidden rounded-xl">
        <img class="w-full h-48 object-cover" src="${plant.image}" alt="${plant.name}" />
      </figure>
      <div class="card-body px-2 py-4 space-y-3">
        <h2 class="text-lg font-semibold text-gray-800">${plant.name}</h2>
        <p class="text-sm text-gray-600 line-clamp-2">${plant.description}</p>
        <div class="flex justify-between items-center">
          <span class="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            ${plant.category}
          </span>
          <span class="text-gray-900 font-bold">৳${plant.price}</span>
        </div>
        <div class="card-actions mt-2">
          <button class="btn bg-green-600 hover:bg-green-700 text-white rounded-full w-full text-base font-medium py-2 add-to-cart-btn" 
            data-id="${plant.id}" data-name="${plant.name}" data-price="${plant.price}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
    postContainer.appendChild(div);
  });
};

// Plants by category
const plantsByCategory = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    loadPost(data.plants);
  } catch (err) {
    console.log(err);
  } finally {
    loading(false);
  }
};

// Add to cart event
postContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    const price = Number(e.target.dataset.price);

    // Check if already in cart
    const existing = cart.find((p) => p.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }

    alert(`${name} added to the cart`);

    displayCart();
  }
});

// Display cart
function displayCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((plant) => {
    total += plant.price * plant.qty;

    const div = document.createElement("div");
    div.className =
      "flex justify-between items-center bg-green-50 px-4 py-2 rounded-lg mb-2 mt-5";
    div.innerHTML = `
      <div>
        <p class="font-semibold text-gray-800">${plant.name}</p>
        <p class="text-gray-600 text-sm">৳${plant.price} × ${plant.qty}</p>
      </div>
      <button onclick="removeFromCart('${plant.id}')" 
        class="text-gray-500 hover:text-red-500 text-lg font-bold">
        ✖
      </button>
    `;
    cartContainer.appendChild(div);
  });

  if (cart.length > 0) {
    const totalDiv = document.createElement("div");
    totalDiv.className =
      "flex justify-between font-bold text-gray-800 mt-4 border-t pt-3";
    totalDiv.innerHTML = `
      <span>Total:</span>
      <span>৳${total}</span>
    `;
    cartContainer.appendChild(totalDiv);
  } else {
    cartContainer.innerHTML = `<p class="text-gray-500 text-center">Your cart is empty 🛒</p>`;
  }
}

// Remove from cart
function removeFromCart(id) {
  cart = cart.filter((p) => p.id !== id);
  displayCart();
}

// Tree name click -> show modal

// Tree name click -> show modal
postContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "H2") {
    const card = e.target.closest(".card");
    const img = card.querySelector("img").src;
    const name = e.target.textContent;
    const category = card.querySelector("span").textContent;
    const price = card
      .querySelector(".text-gray-900")
      .textContent.replace("৳", "");
    const desc = card.querySelector("p").textContent;

    // working from here properly (calling through id )
    document.getElementById("modal-title").textContent = name;
    document.getElementById("modal-image").src = img;
    document.getElementById("modal-category").textContent = category;
    document.getElementById("modal-price").textContent = price;
    document.getElementById("modal-description").textContent = desc;

    // Show modal (check the checkbox)
    document.getElementById("treeModal").checked = true;
  }
});

// working from here data loading
fetchAllPost();
loadCategory();
