const { Router } = require("express");
const bookRouter = Router();
const {
  addBook,
  listAllBooks,
  findBookByTitle,
  deleteBookByTitle,
  updateAuthorByTitle,
  updateBookByTitle,
  getBooksByAuthor,
  deleteAllBooks,
  getBookParamTitle,
} = require("./controllers");

// Request to add a book to the db
bookRouter.post("/addbook", addBook);

// Request to get all books from db
bookRouter.get("/listallbooks", listAllBooks);

// Request to get one book from db by title
bookRouter.get("/findbookbytitle/:title", findBookByTitle);

// Request to delete book by title from db
bookRouter.delete("/deletebookbytitle", deleteBookByTitle);

// Request to update author by title
bookRouter.put("/updateauthorbytitle", updateAuthorByTitle);

// Request to update author/genre by title
bookRouter.put("/updatebookbytitle", updateBookByTitle);

// Request to get all books from an author
bookRouter.get("/getbooksbyauthor/:author", getBooksByAuthor);

// Request to delete all books
bookRouter.delete("/deleteallbooks", deleteAllBooks);

// Request to search book by title and get author and genre
bookRouter.get("/getbook/:title", getBookParamTitle);

module.exports = bookRouter;
