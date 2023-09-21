const {Router} = require("express");
const genreRouter = Router();
const {addGenre} = require("./controllers");

// Route to add genre
genreRouter.post("/addgenre", addGenre);

// // Route to delete genre
// genreRouter.delete("deletegenre", deleteGenre);

// // Route to list all genres
// genreRouter.get("/getallgenres", getAllGenres);


module.exports = genreRouter;