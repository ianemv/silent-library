import UserModel from "../models/usermodel.js"
import { formToObject, checkAuth } from "../utils/utils.js";
import { createTable } from "../elements/table.js";
import { showError } from "../utils/validation.js";

const validationConstraint = {
  email: {
    email: true
  },
  first_name: {
    presence: true,
    length: {minimum: 3}
  },
  last_name: {
    presence: true,
    length: {minimum: 3}
  },
  password: {
    presence: true,
    length: {minimum: 8}
  },
  ["password-confirm"]: {
    equality: "password"
  }
}

const COLUMNS = [
  {name: 'id', title: "ID"},
  {name: 'first_name', title: "First Name"},
  {name: 'last_name', title: "Last Name"},
  {name: 'email', title: "Email"},  
]


function processForm(e){

  e.preventDefault();
  const model = UserModel.getInstance();

  let data = formToObject(e.target);
  
  let cto = {
    first_name: data.first_name,
    last_name: data.last_name,
    password: data.password,
    email: data.email,
    id: data.id || null
  };


  const validateResult = validate(newUser, validationConstraint)

  let hasError = false;

  Object.keys(validateResult).forEach(key => {
    if (validateResult[key].length > 0){
      hasError = true
    }
  })

  if (hasError){
    if (cto.id){
      showError("#editborrowerform", validateResult)
    }else{
      showError("#borrowerform", validateResult)
    }
    return;
  }

  let result = null

  if (cto.id){
    result = model.editBook(cto);
  }else{
    result = model.addNewBook(cto);
  }

  if (result){    
    window.location.replace("./")    
  }else{
    alert("Not saved!")
  }

}

function renderTable(){
  const userModel = UserModel.getInstance();
  const rows = userModel.getAll();
  createTable("#borrowerstable",COLUMNS,rows, "borrowers")
}

if(document.querySelector("#borrowerstable")){
  window.addEventListener("load",renderTable);
}


// edit form
if (document.querySelector("#editborrowerform")){

  function loadDataToForm(){
    const params = new URLSearchParams(window.location.search);
    if (params.get("id") ===null){
      return
    }

    const form = document.querySelector("#editborrowerform");
    const elements = form.elements;
    const id = params.get("id");

    const model = UserModel.getInstance();
    const user = model.getById(id);

    for (var i = 0; i < elements.length; i++){
      if (user[elements[i].name] != null && elements[i].type != 'password'){
        document.querySelector(`[name="${elements[i].name}"]`).value = user[elements[i].name]
      }
    }    
  }

  document.querySelector("#editborrowerform").addEventListener("submit", processForm);
  // load data 
  window.addEventListener("load",loadDataToForm)
}


function deleteBorrower(e){
  const bookId = e.target.dataset.id;
  const resp = confirm("Are you sure want to delete borrower with id "+bookId+"?")
  if (resp){
    const model = User.getInstance();
    model.deleteBorrower(bookId);
    window.location.reload();
  }
}

window.addEventListener("load", function(){
  const allButtons = document.querySelectorAll(".delete-borrower")
  
  allButtons.forEach(e => {
    e.addEventListener("click", deleteBorrower)
  })
  checkAuth()
})
