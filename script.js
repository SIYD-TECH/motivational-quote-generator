const user_name = localStorage.getItem("userName");
let firstLetter = user_name.slice(0, 1).toUpperCase();
let editedName = firstLetter + user_name.slice(1);

// DATE
let time = new Date();
let greeting;
console.log(time);
if (time.getHours() <= 11) {
  greeting = `Good morning, ${editedName}`;
} else if (time.getHours() >= 12 && time.getHours() < 17) {
  greeting = `Good afternoon, ${editedName}`;
} else {
  greeting = `Good evening, ${editedName}`;
}
document.querySelector(".greeting").innerHTML = `${greeting}`;

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

    document.querySelector(".quote-text").innerHTML = data.quote;
    document.querySelector(".quote-author").innerHTML = data.author;
    document.querySelector(".loader").style.display = "none";
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

let favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

function saveToFavourites(quoteObj) {

  const quoteExists = favourites.some(
    (fav) => fav.quote === quoteObj.quote && fav.author === quoteObj.author
  );

  if (!quoteExists) {
    favourites.push(quoteObj);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    alert("Quote has been saved");
  console.log(favourites);

  } else {
    alert("quote already exists");
  }
}

document.querySelector("#saveQuoteBtn").addEventListener("click", () => {
  const favouriteQuote = getCurrentQuote();

  if (favouriteQuote.quote) {
    saveToFavourites(favouriteQuote);
  } else {
    alert("no quote was found to save");
  }
});

  // const favourites = JSON.parse(localStorage.setItem("favourites") || "[]");


function displayFavourites(array) {

  const container = document.querySelector("#favourites-section");

  if (array.length === 0) {
    container.innerHTML = `<p>No favourites yet</p>`;
    // document.querySelector('#favourites').innerHTML =""
    // document.querySelector('#heading').classList.add("hidden")
    return;
  }
  container.innerHTML = "";

  array.forEach((fav, index) => {
    container.innerHTML += `
    <div class="quote-card">
      <p class="quote">"${fav.quote}"</p>
      <p class="author">— ${fav.author}</p>
      <button onclick="removeQuote(${index})" class="remove-btn">Remove</button>
    </div>`;
  });
}

// displayFavourites(favourites)

// search functionality 
document.getElementById('search').addEventListener('input' , () => {
  const searchInput = search.value.trim().toLowerCase()
  // const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

  const filteredClubs = favourites.filter(favourite => {
    const nameMatches = favourite.author.toLowerCase().includes(searchInput)

    return nameMatches;
  })

  displayFavourites(filteredClubs);
})

function removeQuote(index) {
  const confirm = window.confirm("Are you sure you want to delete this quote");

  if (confirm) {
    const updatedFavourites = favourites.filter((_, i) => i !== index);

    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
    alert("quote removed sucessfully");

    favourites = updatedFavourites;

    displayFavourites(updatedFavourites);
    console.log(updatedFavourites)
  } 
}



document.querySelector(`#home`).addEventListener("click", () => {
  document.querySelector("#first").classList.remove("hidden");
  document.querySelector("#home").classList.add("active");
  document.querySelector("#fav").classList.remove("active");

  document.querySelector(`#favourites`).classList.add("hidden");
});

document.querySelector("#fav").addEventListener("click", () => {
  document.querySelector("#first").classList.add("hidden");
  document.querySelector("#fav").classList.add("active");
  document.querySelector("#home").classList.remove("active");

  document.querySelector(`#favourites`).classList.remove("hidden");
  displayFavourites(favourites);
});
