import EventModel from "../models/events.js"
import { formToObject, checkAuth } from "../utils/utils.js";
import { createTable } from "../elements/table.js";
import { showError } from "../utils/validation.js";

const COLUMNS = [
  {name: 'id', title: "ID"},
  {name: 'title', title: "Title"},
  {name: 'description', title: "Description"},
  {name: 'date', title: "Date"}
]

const validationConstraint = {

  title: {
    presence: true,
    length: {minimum: 3}
  },
  image: {
    presence: true,
    length: {minimum: 3}
  },
  date: {
    presence: true,
    length: {minimum: 8}
  },
  description: {
    presence: true,
    length: {minimum: 8}
  }
  
}

function processForm(e){

  e.preventDefault();

  const model = EventModel.getInstance();

  let data = formToObject(e.target);
  
  let cto = {
    title: data.title,
    description: data.description,
    date: data.date,    
    image: data.image,    
    id: data.id || null
  };

  const validateResult = validate(cto, validationConstraint)

  let hasError = false;

  Object.keys(validateResult).forEach(key => {
    if (validateResult[key].length > 0){
      hasError = true
    }
  })

  if (hasError){
    if (cto.id){
      showError("#editeventform", validateResult)
    }else{
      showError("#eventform", validateResult)
    }
    return;
  }

  let result = null

  if (cto.id){
    result = model.editRec(cto);
  }else{
    result = model.addRec(cto);
  }


  if (result){
    alert("Event saved!")
    e.target.reset();
  }else{
    alert("Not saved!")
  }

}

function renderTable () {
  const model = EventModel.getInstance();
  const rows = model.getAll();
  createTable("#eventstable",COLUMNS,rows, "events")
}

function deleteEvent(e){
  const id = e.target.dataset.id;
  const resp = confirm("Are you sure want to delete event with id "+id+"?")
  if (resp){
    const model = EventModel.getInstance();
    model.deleteEvent(id);
    window.location.reload();
  }
}

if (document.querySelector("#eventform")){
  document.querySelector("#eventform").addEventListener("submit", processForm);
}

// edit form
if (document.querySelector("#eventstable")){
  renderTable()
}
if (document.querySelector("#editeventform")){

  function loadDataToForm(){
    const params = new URLSearchParams(window.location.search);
    if (params.get("id") ===null){
      return
    }


    const form = document.querySelector("#editeventform");
    const elements = form.elements;
    const bookId = params.get("id");

    const model = EventModel.getInstance();
    const data = model.getById(bookId);

    for (var i = 0; i < elements.length; i++){
      if (data[elements[i].name] != null){
        document.querySelector(`[name="${elements[i].name}"]`).value = data[elements[i].name]
      }
    }    
  }

  document.querySelector("#editeventform").addEventListener("submit", processForm);
  // load data 
  
  
  loadDataToForm()
  
}


window.addEventListener("load", function(){
  const allButtons = document.querySelectorAll(".delete-event")
  
  allButtons.forEach(e => {
    e.addEventListener("click", deleteEvent)
  })

  checkAuth()
})
