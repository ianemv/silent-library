import BookModel from "../models/bookmodel.js"

function processBook(e){

  e.preventDefault();

  const bookModel = BookModel.getInstance();

  const elements = e.target.elements;
  let data = {};

  for (var i = 0; i < elements.length; i++){
    data[elements[i].name] = elements[i].value;
  }
  
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

function updatePage(){

}



document.querySelector("#bookform").addEventListener("submit", processBook);
