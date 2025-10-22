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
document.getElementById("date").innerHTML =`Today's date is ${todaysDate}`;

// Quote genrator functionality
// fetch("https://api.quotable.io/random")
// .then(response => response.json())
// .then(data =>{
//     console.log(data.content);
    
// });


async function getQuote() {
    try{
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json()
        console.log(data);
        document.querySelector(".quote-text").innerHTML = data.content;
        document.querySelector(".quote-author").innerHTML = data.author;
    }catch (err){
        console.error(err)
    }
}

getQuote()