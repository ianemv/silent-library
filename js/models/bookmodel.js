
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

  getJsonData(){
    const books = JSON.parse(localStorage.getItem("books"));

    if (books != null){
      return books;
    }
    return [];
  }

  getAllBooks(){
    const books = JSON.parse(localStorage.getItem("books"));

    if (books != null){
      return books;
    }

    return [];
  }

  getBookById(id){
    const books = this.getJsonData();
    let book = null;
    book = books.find(a => a.id === id);
    return book;
  }

  addNewBook(book){
    
    let books = JSON.parse(localStorage.getItem("books")) || [];

    //books = [...books, book];
    book.id = "BK-"+this.generateId();
    books.push(book);
    // update the localStorage with key books
    // JSON.stringify () to convert JSON Object to string
    // which is 
    localStorage.setItem("books", JSON.stringify(books));
    return true;
  }

  editBook(data){
    // get the books from localStorage
    let books = JSON.parse(localStorage.getItem("books")) || [];
    // find the book by id
    
    let bookIndex = books.findIndex(a => a.id == data.id);
    if (bookIndex > -1){      
      books.splice(bookIndex,1,data)
    }
    localStorage.setItem("books", JSON.stringify(books));
    return true;
  }

  deleteBook(id){
    let books = JSON.parse(localStorage.getItem("books")) || [];
    // find the book by id
    let filteredBooks = books.filter(a => a.id != id);

    localStorage.setItem("books", JSON.stringify(filteredBooks));
    return true;
  }

   generateId(){    
    return Date.now();
  }

  message(){
    alert("hello");
  }
}

BookModel._instance = null;

export default BookModel;