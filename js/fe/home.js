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

async function loadInitialBooks(){
  let users = localStorage.getItem("books") == null ? null : JSON.parse(localStorage.getItem("books"));
  users = JSON.parse(localStorage.getItem("books"));
  if (users == null) {

    const resp = await fetch("./mockdata/books.json", {
      credentials: 'same-origin'
    })
    
    const result = await resp.json();    
    localStorage.setItem("books", JSON.stringify(result));
    
  }
}
async function loadInitialEvents(){
  let users = localStorage.getItem("events") == null ? null : JSON.parse(localStorage.getItem("events"));
  users = JSON.parse(localStorage.getItem("events"));
  if (users == null) {

    const resp = await fetch("./mockdata/events.json", {
      credentials: 'same-origin'
    })
    
    const result = await resp.json();    
    localStorage.setItem("events", JSON.stringify(result));
    
  }
}

window.addEventListener("load",function(){
  loadInitialUsers()
  loadInitialBooks()
  loadInitialEvents()
})