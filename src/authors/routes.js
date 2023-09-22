const {Router} = require("express");
const authorRouter = Router();
const {addAuthor, listAllAuthors, deleteAuthor, getAuthor} = require("./controllers");

// Request to add an author
authorRouter.post("/addauthor", addAuthor);

// Request to get all authors
authorRouter.get("/listallauthors", listAllAuthors);

// Request to delete author
authorRouter.delete("/deleteauthor", deleteAuthor);

// Request to find author and releated books
authorRouter.get("/getauthor", getAuthor);

module.exports = authorRouter;