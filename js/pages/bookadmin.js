import BookModel from "../models/bookmodel.js"
import { formToObject } from "../utils/utils.js";
import { createTable } from "../elements/table.js";

const HEADINGS = [
  'ID',
  "Title",
  "Author",
  "Date Published",
  "Description",
  "Publisher",
  "Action",
];

const columnFields = {
  name: ''
};

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
  createTable("#booktable",HEADINGS,rows,true)
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
      //data[elements[i].name] = elements[i].value;
      if (book[elements[i].name] != null){
        document.querySelector(`[name="${elements[i].name}"]`).value = book[elements[i].name]
      }
    }
    //const bookData = bookModel()

  }

  document.querySelector("#editbookform").addEventListener("submit", processBook);
  // load data 
  window.addEventListener("load",loadDataToForm)

}
