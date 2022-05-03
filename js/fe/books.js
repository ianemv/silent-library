import BookModel from "../models/bookmodel.js"

function renderBooks (){
  const model = BookModel.getInstance();
  const rows = model.getAllBooks();
  const elements = rows.map(a => {
    return createEventEl(a)
  })

  const eventsContainer = document.querySelector("#books");

  eventsContainer.innerHTML = elements;

}

function createEventEl(row){
  return  `<div class="flex border-bottom-dashed-washed mb-20 py-1">
  <div class="mr-2">
    <img class="book-cover" src="${row.image}" alt="" width="150">
  </div>
  <div>
    <h4>
      ${row.title}
    </h4>   
    <p>Author: ${row.author}</p>
    <p>${row.description}</p>
  </div>
</div>
  `

}

renderBooks()