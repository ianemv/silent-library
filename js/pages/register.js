import { formToObject } from "../utils/utils.js";
import UserModel from "../models/usermodel.js"
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

function handleRegistration(e){
  e.preventDefault();
  let data = formToObject(e.target);
  const userModel = UserModel.getInstance();

  let newUser = {
    first_name: data.first_name,
    last_name: data.last_name,
    password: data.password,
    email: data.email
  }

  const result = validate(newUser, validationConstraint)

  let hasError = false;

  Object.keys(result).forEach(key => {
    if (result[key].length > 0){
      hasError = true
    }
  })

  
  if (hasError){
    showError("#registrationform", result)
    return;
  }

  if (userModel.emailExists(data.email)){
    alert("Email already registered.");
    return;
  }
  
}

window.addEventListener("load", () => {
  document.querySelector("#registrationform").addEventListener("submit", handleRegistration)

});