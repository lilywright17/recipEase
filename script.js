const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "2e5af455";
const APP_KEY = "9dfa1ec25fd7af1d5b8ae7ec231d7fc3";
let diet = "vegan";
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  console.log(searchQuery);
  checkDiet();
  checkMeal();
  fetchAPI();
});

// Function to check which dietary requirement was selected
function checkDiet() {
  if (document.getElementById("vegan").checked) {
    diet = "vegan";
  } else if (document.getElementById("vegetarian").checked) {
    diet = "vegetarian";
  } else if (document.getElementById("gf").checked) {
    diet = "gluten-free";
  } else if (document.getElementById("df").checked) {
    diet = "dairy-free";
  } else {
    diet = "";
  }
}

// Function to check which meal type was selected
function checkMeal() {
  if (document.getElementById("breakfast").checked) {
    mealType = "breakfast";
  } else if (document.getElementById("lunch").checked) {
    mealType = "lunch";
  } else if (document.getElementById("dinner").checked) {
    mealType = "dinner";
  } else if (document.getElementById("snack").checked) {
    mealType = "snack";
  } else {
    mealType = "";
  }
}

async function fetchAPI() {
  let baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
  // Check if diet and meal type have been selected, if they haven't we don't want to include these parts in the URL
  if (mealType != "") baseURL += `&mealType=${mealType}`;
  if (diet != "") baseURL += `&health=${diet}`;
  console.log(baseURL);
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}

// Generate the HTML for the search results
function generateHTML(results) {
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `<div class="item">
        <img src="${result.recipe.image}" alt="pasta" />
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-button" href="${
            result.recipe.url
          }" target="_blank">View recipe</a>
        </div>
        <p class="item-data">Meal type: ${result.recipe.mealType}</p>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
        <p class="item-data">Diet: ${
          result.recipe.healthLabels.length > 5
            ? result.recipe.healthLabels.slice(0, 5)
            : result.recipe.healthLabels
        }</p>
      </div>`;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
