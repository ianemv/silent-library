import BookModel from "../models/bookmodel.js";
import EventModel from "../models/events.js";

const bookModel = BookModel.getInstance();
const eventModel = EventModel.getInstance();

async function loadInitialData(key){  
  let users = localStorage.getItem(key) == null ? null : JSON.parse(localStorage.getItem(key));
  users = JSON.parse(localStorage.getItem(key));
  if (users == null) {
    const resp = await fetch(`./mockdata/${key}.json`, {
      credentials: 'same-origin'
    })
    const result = await resp.json();    
    localStorage.setItem(key, JSON.stringify(result));
  }
}

function displayBooks(){
  const bookContainer = document.querySelector("#books-homepage");
  const books = bookModel.getAllBooks();

  let elem = '';

  if(books.length > 0) {
    for(var i=0; i < 4; i++){
      elem += `<div>
        <img class="book-cover" src="${books[i].image}" alt="${books[i].title}" width="150">
        <p>${books[i].title}</p>
        <p>${books[i].author}</p>
      </div>`;
    }
  }
  bookContainer.innerHTML = elem;
}

function displayEvents(){
  const eventsContainer = document.querySelector("#events-promotion");
  const events = eventModel.getAll();

  let elem = '';

  if(events.length > 0) {
    for(var i=0; i < 3; i++){
      if (events[i]) {
        elem += `<div><a href="./event-details.html?id=${events[i].id}">
        <img class="event-cover" src="${events[i].image}" alt="${events[i].title}" width="150"></a>
        <p>${events[i].title}</p>
        <p>${events[i].date}</p>
        </div>`;
      }
    }
  }
  eventsContainer.innerHTML = elem;
}

window.addEventListener("load",function(){
  loadInitialData("users");
  loadInitialData("books");
  loadInitialData("events");
  displayBooks();
  displayEvents();
});