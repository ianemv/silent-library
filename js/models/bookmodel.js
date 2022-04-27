
class BookModel {
  constructor(){
    this._instance = null;
  }

  static getInstance(){

    if (this._instance == null){
      this._instance = new BookModel();
    }
    return this._instance;
    
  }

  getAllBooks(){
    const books = JSON.parse(localStorage.getItem("books"));
    if (books != null){
      return books;
    }

    return [];
  }

  addNewBook(book){
    let books = JSON.parse(localStorage.getItem("books")) || [];

    books = [...books, book];
    localStorage.setItem("books", JSON.stringify(books));
  }

  message(){
    alert("hello");
  }
}

BookModel._instance = null;

export default BookModel;