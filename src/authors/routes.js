const {Router} = require("express");
const authorRouter = Router();
const {addAuthor, listAllAuthors, deleteAuthor} = require("./controllers");

// Request to add an author
authorRouter.post("/addauthor", addAuthor);

// Request to get all authors from author table
authorRouter.get("/listallauthors", listAllAuthors);

// Request to delete author from author table
authorRouter.delete("/deleteauthor", deleteAuthor);

module.exports = authorRouter;