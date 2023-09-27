const Book = require("./model");
const Genre = require("../genres/model");
const Author = require("../authors/model");

const addBook = async (req, res) => {
  console.log(req.body);
  try {
    let genre = await Genre.findOne({ where: { genre: req.body.genre } });
    console.log(genre);
    if (!genre) {
      genre = await Genre.create({
        genre: req.body.genre,
      });
    }
    console.log("genre:", genre);
    let author = await Author.findOne({ where: { name: req.body.author } });
    console.log(author);
    if (!author) {
      author = await Author.create({
        name: req.body.author,
      });
    }
    console.log("author:", author);
    const book = await Book.create({
      title: req.body.title,
      AuthorId: author.id,
      GenreId: genre.id,
    });
    res.status(201).json({
      book: book,
      message: "Book created",
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Error occurred",
      error: error,
    });
  }
};

const listAllBooks = async (req, res) => {
  try {
    const listAllBooks = await Book.findAll({});
    res.status(200).json({
      message: "Success",
      books: listAllBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Error occurred",
      error: error,
    });
  }
};

const findBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ where: {title: req.params["title"]}});

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        title: req.body.title,
      });
    } else {
      res.status(200).json({
        message: "Book found",
        book: book,
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

const deleteBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { title: req.body.title } });
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        title: req.body.title,
      });
    } else {
      await book.destroy();
      res.status(200).json({
        message: "Book deleted",
        book: book,
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

const updateAuthorByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { title: req.body.title } });
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        title: req.body.title,
      });
    } else {
      book.author = req.body.author;
      await book.save();
      res.status(200).json({
        message: "Author updated",
        book: book,
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

const updateBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { title: req.body.title } });
    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        title: req.body.title,
      });
    } else {
      await book.update({
        author: req.body.author,
        genre: req.body.genre,
      });
      await book.save();
      res.status(200).json({
        message: "Book updated",
        book: book,
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

const getBooksByAuthor = async (req, res) => {
  try {
    const author = await Author.findOne({ where: {name: req.params["author"]} });
    if (!author) {
      res.status(404).json({
        success: false,
        message: "Author not found",
        author: req.body.author,
      });
    } else {
      const listAllBooks = await Book.findAll({ where: { AuthorId: author.id } });
      res.status(200).json({
        message: "Success",
        books: listAllBooks,
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

const deleteAllBooks = async (req, res) => {
  try {
    await Book.destroy({ where: {} });
    res.status(200).json({
      message: "All books deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "Error occurred",
      error: error,
    });
  }
};

const getBookParamTitle =  async (req, res) => {
  try {
    const books = await Book.findOne({ where: {title: req.params["title"]} });
    if (!books) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        author: req.params["title"],
      });
    } else {
      const getAuthor = await Author.findOne({ where: { id: books.AuthorId } });
      let genreId = books.GenreId;
      const getGenre = await Genre.findOne({where: {id: genreId}});
      res.status(200).json({
        message: "Success",
        book: req.params["title"],
        author: getAuthor.name,
        genre: getGenre.genre,
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
  addBook,
  listAllBooks,
  findBookByTitle,
  deleteBookByTitle,
  updateAuthorByTitle,
  updateBookByTitle,
  getBooksByAuthor,
  deleteAllBooks,
  getBookParamTitle,
};
