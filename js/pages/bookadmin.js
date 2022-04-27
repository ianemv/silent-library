import BookModel from "../models/bookmodel.js"

function processBook(e){
  e.preventDefault();
  const bookModel = BookModel.getInstance();

  const elements = e.target.elements;
  let data = {};

  for (var i = 0; i < elements.length; i++){
    data[elements[i].name] = elements[i].value;
  }
  
  let book = {
    title: data.title,
    description: data.description,
    author: data.author,
    date_published: data.date_published,
  };



  bookModel.addNewBook(book);

}

document.getElementById("bookform").addEventListener("submit", processBook);