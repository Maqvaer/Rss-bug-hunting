const products = [
  { id: 1, name: "iPhone 15", price: 999, category: "phone" },
  { id: 2, name: "Galaxy S24", price: 899, category: "phone" },
  { id: 3, name: "Pixel 8", price: 699, category: "phone" },
  { id: 4, name: "MacBook Air", price: 1199, category: "laptop" },
  { id: 5, name: "ThinkPad X1", price: 1399, category: "laptop" },
  { id: 6, name: "AirPods Pro", price: 249, category: "audio" },
  { id: 7, name: "Sony WH-1000", price: 349, category: "audio" },
  { id: 8, name: "JBL Flip", price: 129, category: "audio" },
];

const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const grid = document.getElementById("grid");
const countEl = document.getElementById("count");
let result = [];
result = products;
function getFiltered(filter,event) {
  const searchStr = searchInput.value;
  switch (filter) {
    case "search":
      if (search) {
        result = result.filter((p) => p.name.toLowerCase().includes(searchStr.toLowerCase()));
      }
      console.log(result);
      return render(result);
         case "category":
      if (event.target.value !== "all") {
        result = result.filter((p) => p.category === event.target.value);
      }
      console.log(result);
      return render(result);
          case "sort":
      if (event.target.value === "asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (event.target.value === "desc") {
        result.sort((a, b) => b.price - a.price);
      } else if (event.target.value === "default") {
        result.sort((a, b) => a.id - b.id);
      }
      return render(result);
      default:
        return render(products);
  } 
}



function render(items) {
  grid.innerHTML = "";
  items.forEach((p) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h3>${p.name}</h3><p class="cat">${p.category}</p><p class="price">$${p.price}</p>`;
    grid.appendChild(card);
  });
  countEl.textContent = items.length;
}


searchInput.addEventListener("input", (event) => getFiltered("search",event));
categorySelect.addEventListener("change", (event) => getFiltered("category",event));
sortSelect.addEventListener("change", (event) => getFiltered("sort",event));


resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  sortSelect.value = "default";
  getFiltered("search", { target: searchInput });
  getFiltered("category", { target: categorySelect });
  getFiltered("sort", { target: sortSelect });
  render(products);
  result = products;
});


render(products);

