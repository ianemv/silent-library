import BookModel from "../models/bookmodel.js"
import { formToObject } from "../utils/utils.js";
import { createTable } from "../elements/table.js";

const COLUMNS = [
  {name: 'id', title: "ID"},
  {name: 'title', title: "Title"},
  {name: 'author', title: "Author"},
  {name: 'date_published', title: "Date Published"},
  {name: 'description', title: "Description"},
  {name: 'publisher', title: "Publiser"},
]


function processBook(e){

  e.preventDefault();
  const bookModel = BookModel.getInstance();

  let data = formToObject(e.target);
  
  let book = {
    title: data.title,
    description: data.description,
    author: data.author,
    date_published: data.date_published,
    publisher: data.publisher,
    id: data.id || null
  };

  let result = null

  if (book.id){
    result = bookModel.editBook(book);
  }else{
    result = bookModel.addNewBook(book);
  }


  if (result){
    alert("Book saved!")
    e.target.reset();
  }else{
    alert("Not saved!")
  }

}

function renderTable(){
  const bookModel = BookModel.getInstance();
  const rows = bookModel.getAllBooks();
  createTable("#booktable",COLUMNS,rows)
}

function deleteBook(e){
  const bookId = e.target.dataset.id;
  const resp = confirm("Are you sure want to delete book with id "+bookId+"?")
  if (resp){
    const bookModel = BookModel.getInstance();
    bookModel.deleteBook(bookId);
    window.location.reload();
  }
}

if (document.querySelector("#bookform")){
  document.querySelector("#bookform").addEventListener("submit", processBook);
}

if(document.querySelector("#booktable")){
  window.addEventListener("load",renderTable)
}


// edit form
if (document.querySelector("#editbookform")){

  function loadDataToForm(){
    const params = new URLSearchParams(window.location.search);
    if (params.get("id") ===null){
      return
    }

    const form = document.querySelector("#editbookform");
    const elements = form.elements;
    const bookId = params.get("id");

    const bookModel = BookModel.getInstance();
    const book = bookModel.getBookById(bookId);

    for (var i = 0; i < elements.length; i++){
      if (book[elements[i].name] != null){
        document.querySelector(`[name="${elements[i].name}"]`).value = book[elements[i].name]
      }
    }    
  }

  document.querySelector("#editbookform").addEventListener("submit", processBook);
  // load data 
  window.addEventListener("load",loadDataToForm)
}


window.addEventListener("load", function(){
  const allButtons = document.querySelectorAll(".delete-book")
  
  allButtons.forEach(e => {
    e.addEventListener("click", deleteBook)
  })
})
