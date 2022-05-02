
import { formToObject } from "../utils/utils.js";

function processLogin(e){
  e.preventDefault();
  
  let users = localStorage.getItem("users") === null ? null : 
  users = JSON.parse(localStorage.getItem("users"));;

  
  if (users == null){
    const admin = {
      username: "admin@mail.com",
      password: "default"
    }
    localStorage.setItem("users", JSON.stringify([admin]));
    users = JSON.parse(localStorage.getItem("users"));
  }

  let data = formToObject(e.target);
  
  const login = {
    password: data.password,
    email: data.email,
  };

  const found = users.find(a => a.email == login.email )
  if (found && found.password == login.password ){
    window.location.replace("./admin/books")
  }




}


window.addEventListener("load", function(){

  if (document.querySelector("#loginform")){
    document.querySelector("#loginform").addEventListener("submit", processLogin);
  }

}, false)