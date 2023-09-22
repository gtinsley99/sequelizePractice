const {Router} = require("express");
const genreRouter = Router();
const {addGenre, deleteGenre, getAllGenres, getGenre} = require("./controllers");

// Route to add genre
genreRouter.post("/addgenre", addGenre);

// // Route to delete genre
genreRouter.delete("deletegenre", deleteGenre);

// // Route to list all genres
genreRouter.get("/getallgenres", getAllGenres);

// Route to get one genre and related books
genreRouter.get("/getgenre", getGenre);


module.exports = genreRouter;