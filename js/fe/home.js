async function loadInitialUsers(){
  
  let users = localStorage.getItem("users") == null ? null : JSON.parse(localStorage.getItem("users"));
  users = JSON.parse(localStorage.getItem("users"));
  if (users == null) {

    const resp = await fetch("./mockdata/users.json", {
      credentials: 'same-origin'
    })
    
    const result = await resp.json();    
    localStorage.setItem("users", JSON.stringify(result));
    
  }
}

window.addEventListener("load",function(){
  loadInitialUsers()
})