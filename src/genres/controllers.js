const Genre = require("./model");
const Book = require("../books/model");
const Author = require("../authors/model");

const addGenre = async (req, res) => {
  try {
    console.log(req.body);
    const genre = await Genre.create({
      genre: req.body.genre,
    });
    res.status(201).json({
      genre: genre,
      message: "Genre added",
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Error occurred",
      error: error,
    });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findOne({ where: { genre: req.body.genre } });
    if (!genre) {
      res.status(404).json({
        success: false,
        message: "Genre not found",
        genre: req.body.genre,
      });
    } else {
      await genre.destroy();
      res.status(200).json({
        message: "Genre deleted",
        genre: genre,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Error occurred",
      error: error,
    });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const getAllGenres = await Genre.findAll({});
    res.status(200).json({
      message: "Success",
      genres: getAllGenres,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Error occurred",
      error: error,
    });
  }
};

const getGenre = async (req, res) => {
  try {
    const getGenre = await Genre.findOne({ where: { genre: req.params["genre"]} });
    if (!getGenre) {
      res.status(404).json({
        success: false,
        message: "Genre not found",
        genre: req.body.genre,
      });
    } else {
      const getBooks = await Book.findAll({ where: { GenreId: getGenre.id } });
      res.status(200).json({
        message: "Success",
        genre: getGenre,
        books: getBooks,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Error occurred",
      error: error,
    });
  }
};

const getGenreParamGenre = async (req, res) => {
  try {
    const genre = await Genre.findOne({ where: {genre: req.params["genre"]} });
    if (!genre) {
      res.status(404).json({
        success: false,
        message: "Genre not found",
        author: req.params["genre"],
      });
    } else {
      const getBooks = await Book.findAll({ where: { GenreId: genre.id },
      attributes: [
          "title",
          "AuthorId"
      ]});
      const getAuthors = await Author.findAll({where:{id: getBooks.map((element) => element.AuthorId)}});
      res.status(200).json({
        message: "Success",
        genre: req.params["genre"],
        books: getBooks.map((element) => element.title),
        authors: getAuthors.map((element) => element.name),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Error occurred",
      error: error,
    });
  }
};

module.exports = {
  addGenre,
  deleteGenre,
  getAllGenres,
  getGenre,
  getGenreParamGenre,
};
