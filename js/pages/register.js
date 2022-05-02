import { formToObject } from "../utils/utils.js";
import UserModel from "../models/usermodel.js"

function handleRegistration(e){
  e.preventDefault();
  let data = formToObject(e.target);
  const userModel = UserModel.getInstance();

  if (userModel.emailExists(data.email)){
    alert("Email already registered.");
    return;
  }

  let newUser = {
    first_name: data.first_name,
    last_name: data.last_name,
    password: data.password,
    email: data.email
  }

  const resp = userModel.adduser(newUser);

  if (resp){
    alert("You are registered.");
    window.location.replace("./login.html")
  }
  
}

window.addEventListener("load", () => {
  
  document.querySelector("#registrationform").addEventListener("submit", handleRegistration)

});