const { Router } = require("express");
const bookRouter = Router();
const {addBook, listAllBooks, findBookByTitle, deleteBookByTitle, updateAuthorByTitle, updateBookByTitle, getBooksByAuthor} = require("./controllers");

// Request to add a book to the db
bookRouter.post("/addbook", addBook);

// Request to get all books from db
bookRouter.get("/listallbooks", listAllBooks);

// Request to get one book from db by title
bookRouter.get("/findbookbytitle", findBookByTitle);

// Request to delete book by title from db
bookRouter.delete("/deletebookbytitle", deleteBookByTitle);

// Request to update author by title
bookRouter.put("/updateauthorbytitle", updateAuthorByTitle);

// Request to update author/genre by title
bookRouter.put("/updatebookbytitle", updateBookByTitle);

// Request to get all books from an author
bookRouter.get("/getbooksbyauthor", getBooksByAuthor);

module.exports = bookRouter;