import EventModel from "../models/events.js";
import InquiryModel from "../models/inquiry.js";
import { formToObject } from "../utils/utils.js"

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
        <a href="./event-details.html?id=${row.id}">Book Launching</a> 
      </h4>   
      <p>${row.date}</p>
      <p>${row.description}</p>
    </div>
  </div>`

}
if(document.querySelector("#eventpage")){
  renderEvents()
}

if (document.querySelector("#event-content")){
  const eventPage = document.querySelector("#event-content");
  const params = new URLSearchParams(window.location.search);

  if (params.get("id") !=null){

    const id = params.get("id");
    
    const model = EventModel.getInstance();
    const row = model.getById(id);
  
    eventPage.innerHTML = renderEventDetails(row);
  }

}

function submitEventInquiry(e){
  e.preventDefault();
  let data = formToObject(e.target);
  const model = InquiryModel.getInstance();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  let inquiry = {
    email: data.email,
    message: data.message,
    date: Date.now(),
    fullname: data.name,
    event_id: id
  }

  const result = model.addRec(inquiry)

  if (result){
    alert("Your message has been sent.!")
    e.target.reset();
  }else{
    alert("Not able to process for now!")
  }
}

if (document.querySelector("#event-inquiry")){
  document.querySelector("#event-inquiry").addEventListener("submit",
  submitEventInquiry)
}

// for details page

function renderEventDetails(row){
  return `
   <div class="mr-2 text-center">
    <img class="event-detail-cover" src="${row.image}" alt="" >
    </div>
    <div class="flex border-bottom-dashed-washed mb-20 py-1">
      <div class="content">
        <h3>
          ${row.title}
        </h3>   
        <p>${row.date}</p>
        <p>${row.description}</p>
      </div>  
    </div>  
  `
}