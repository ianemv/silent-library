export const formToObject = (form) => {
	const elements = form.elements;
  let data = {};

  for (var i = 0; i < elements.length; i++){
    data[elements[i].name] = elements[i].value;
  }
	return data;
}

export const isLoggedIn = () =>{
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn
}

export const checkAuth = () => {
  const btn = document.querySelector("#login-btn");
  
  if (isLoggedIn()){
    btn.innerHTML = "Logout"
  }

  btn.addEventListener("click", (e)=>{
    
    if (isLoggedIn()){
      e.preventDefault()
      localStorage.removeItem("isLoggedIn");
      window.location.replace("../../")
    }
  })
}