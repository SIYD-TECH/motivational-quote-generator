// alert("solo")
const user_name = localStorage.getItem("userName");
// // console.log(user_name);
let firstLetter = user_name.slice(0, 1).toUpperCase();
let editedName = firstLetter + user_name.slice(1);
let time = new Date().toTimeString();
console.log(time);
if (time.includes("AM")) {
  console.log(true);
} else if (time.includes("PM")) {
  console.log(false);
}
document.querySelector(".greeting").innerHTML = `Good morning, ${editedName}`;

// Dark mode toggle
document.querySelector(".theme-toggle-btn").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// CLOCK functionality
const updateClock = () => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  document.getElementById("clock").innerHTML = time;
};

setInterval(updateClock, 1000);

// Date functionality
const date = new Date();
const todaysDate = date.toLocaleDateString();
document.getElementById("date").innerHTML = `Today's date is ${todaysDate}`;

document.querySelector(".loader").style.display = "none";

async function getQuote() {
  document.querySelector(".loader").style.display = "block";
  document.querySelector(".quote-text").innerHTML = "";
  document.querySelector(".quote-author").innerHTML = "";
  try {
    await new Promise((resolve) => setTimeout(resolve, 500)); // used to intentionally delay the fetch

    const response = await fetch(
      "https://quoteslate.vercel.app/api/quotes/random"
    );
    const data = await response.json();
    console.log(data);

    document.querySelector(".quote-text").innerHTML = data.quote;
    document.querySelector(".quote-author").innerHTML = data.author;
    document.querySelector(".loader").style.display = "none";
    // document.querySelector(".quote-text").innerHTML = '';
  } catch (err) {
    console.error(err);
  }
}

getQuote();

// Saving to favourites
function getCurrentQuote() {
  const id = new Date().toLocaleString();
  const quoteEl = document.querySelector(".quote-text");
  const authorEl = document.querySelector(".quote-author");
  const quote = quoteEl ? quoteEl.innerText.trim() : "";
  const author = authorEl ? authorEl.innerText.trim() : "";
  return { id, quote, author };
}

function saveToFavourites(quoteObj) {
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  const quoteExists = favourites.some(
    (fav) => fav.quote === quoteObj.quote && fav.author === quoteObj.author
  );

  if (!quoteExists) {
    favourites.push(quoteObj);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    console.log(favourites);
  } else {
    alert("quote alraedy exists");
  }
  // console.log(favourites);
}

document.querySelector("#saveQuoteBtn").addEventListener("click", () => {
  const favouriteQuote = getCurrentQuote();

  if (favouriteQuote.quote) {
    saveToFavourites(favouriteQuote);
    alert("Quote has been saved");
    // console.log(favourites)
  } else {
    alert("no quote was found to save");
  }
});

function displayFavourites() {
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
  console.log(favourites);

  const container = document.querySelector("#favourites-section");

  if (favourites.length === 0) {
    container.innerHTML = `<p>No favourites yet</p>`;
    return;
  }
  container.innerHTML = "";

  favourites.forEach((fav, index) => {
    container.innerHTML += `
    <div class="quote-card">
      <p class="quote">"${fav.quote}"</p>
      <p class="author">— ${fav.author}</p>
      <button onclick="removeQuote(${index})" class="remove-btn">Remove</button>
    </div>`;
  });
}

// displayFavourites();

function removeQuote(index) {
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

  const updatedFavourites = favourites.filter((_,i) => i !== index);

  localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  console.log("quote removed sucessfully");

  displayFavourites();
}

// switch display
// function

document.querySelector(`#home`).addEventListener("click", () => {
  document.querySelector("#first").classList.remove("hidden");
  document.querySelector("#home").classList.add("active");
  document.querySelector("#fav").classList.remove("active");

  document.querySelector(`#favourites-section`).classList.add("hidden");
  // console.log('clicked')
});

document.querySelector("#fav").addEventListener("click", () => {
  document.querySelector("#first").classList.add("hidden");
  document.querySelector("#fav").classList.add("active");
  document.querySelector("#home").classList.remove("active");

  document.querySelector(`#favourites-section`).classList.remove("hidden");
  displayFavourites();
});

console.log(JSON.parse(localStorage.getItem("favourites")));
