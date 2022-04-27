
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

  addMember(memberdata){
    // i will update the localStorage
  }

  addNewBook(book){
    
    let books = JSON.parse(localStorage.getItem("books")) || [];

    //books = [...books, book];
    books.push(book);
    // update the localStorage with key books
    // JSON.stringify () to convert JSON Object to string
    // which is 
    localStorage.setItem("books", JSON.stringify(books));
    return true;
  }

  editBook(id, data){
    // get the books from localStorage
    let books = JSON.parse(localStorage.getItem("books")) || [];
    // find the book by id
    let bookToEdit = books.find(id);
    bookToEdit = {...data};

  }

  deleteBook(id){

  }

  message(){
    alert("hello");
  }
}

BookModel._instance = null;

export default BookModel;