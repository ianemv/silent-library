import EventModel from "../models/events.js"

function renderEvents (){
  const model = EventModel.getInstance();
  const rows = model.getAll();
  const elements = rows.map(a => {
    return createEventEl(a)
  })

  const eventsContainer = document.querySelector("#events");

  eventsContainer.innerHTML = elements;

}

function createEventEl(row){
  return  `<div class="flex border-bottom-dashed-washed mb-20 py-1">
    <div class="mr-2">
      <img class="event-cover" src="${row.image}" alt="" >
    </div>
    <div>
      <h4>
        <a href="./events.html?id=${row.id}">Book Launching</a> 
      </h4>   
      <p>${row.date}</p>
      <p>${row.description}</p>
    </div>
  </div>`

}

renderEvents()