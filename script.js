// alert("solo")
const user_name = localStorage.getItem("userName");
// console.log(user_name);
let firstLetter = user_name.slice(0, 1).toUpperCase();
let editedName = firstLetter + user_name.slice(1);
document.querySelector(".greeting").innerHTML = `Good morning, ${editedName}`;

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

// Quote genrator functionality
// fetch("https://api.quotable.io/random")
// .then(response => response.json())
// .then(data =>{
//     console.log(data.content);

// });
document.querySelector(".loader").style.display = "none";

async function getQuote() {
  document.querySelector(".loader").style.display = "block";
  document.querySelector(".quote-text").innerHTML = "";
  document.querySelector(".quote-author").innerHTML = "";
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // used to intentionally delay the fetch

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
