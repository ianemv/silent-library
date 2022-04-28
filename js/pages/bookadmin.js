import BookModel from "../models/bookmodel.js"
import { formToObject } from "../utils/utils.js";
import { createTable } from "../elements/table.js";

const HEADINGS = [
  'ID',
  "Title",
  "Author",
  "Date Published",
  "Action",
];

const columnFields = {
  name: ''
};



function processBook(e){

  e.preventDefault();

  const bookModel = BookModel.getInstance();

  let data = formToObject(e.target);
  
  const book = {
    title: data.title,
    description: data.description,
    author: data.author,
    date_published: data.date_published,
  };

  const result = bookModel.addNewBook(book);

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
