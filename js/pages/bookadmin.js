import BookModel from "../models/bookmodel.js"
import { formToObject, checkAuth } from "../utils/utils.js";
import { createTable } from "../elements/table.js";
import { showError } from "../utils/validation.js";

const COLUMNS = [
  {name: 'id', title: "ID"},
  {name: 'title', title: "Title"},
  {name: 'author', title: "Author"},
  {name: 'date_published', title: "Date Published"},
  {name: 'description', title: "Description"},
  {name: 'publisher', title: "Publiser"},
]

const validationConstraint = {

  title: {
    presence: true,
    length: {minimum: 3}
  },
  author: {
    presence: true,
    length: {minimum: 3}
  },
  date_published: {
    presence: true,
    length: {minimum: 8}
  },
  publisher: {
    presence: true,
    length: {minimum: 3}
  },
  image: {
    presence: true,
    length: {minimum: 10}
  },
  description: {
    presence: true,
    length: {minimum: 10}
  },

}

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
    genre: data.genre,
    image: data.image || "",
    id: data.id || null
  };

  const validateResult = validate(book, validationConstraint)

  let hasError = false;

  Object.keys(validateResult).forEach(key => {
    if (validateResult[key].length > 0){
      hasError = true
    }
  })

  
  if (hasError){
    if (book.id){
      showError("#editbookform", validateResult)
    }else{
      showError("#bookform", validateResult)
    }
    return;
  }

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
  createTable("#booktable",COLUMNS,rows, "books")
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

  checkAuth()
})
