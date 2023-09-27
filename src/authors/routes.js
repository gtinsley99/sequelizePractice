const {Router} = require("express");
const authorRouter = Router();
const {addAuthor, listAllAuthors, deleteAuthor, getAuthor, getAuthorParamName} = require("./controllers");

// Request to add an author
authorRouter.post("/addauthor", addAuthor);

// Request to get all authors
authorRouter.get("/listallauthors", listAllAuthors);

// Request to delete author
authorRouter.delete("/deleteauthor", deleteAuthor);

// Request to find author and releated books
authorRouter.get("/getauthor/:name", getAuthor);

// Request to find all books and genres of author
authorRouter.get("/getallauthor/:name", getAuthorParamName);

module.exports = authorRouter;