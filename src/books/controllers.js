const Book = require("./model");
const Genre = require("../genres/model");
const Author = require("../authors/model");

const addBook = async (req, res) => {
    console.log(req.body);
    try {
        let genre = await Genre.findOne({where: {genre: req.body.genre}});
        console.log(genre);
        if (!genre){
            genre = await Genre.create({
                genre: req.body.genre
            });
        };
        console.log("genre:", genre);
        let author = await Author.findOne({where: {name: req.body.author}});
        console.log(author);
        if (!author){
            author = await Author.create({
                name: req.body.author
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
            message: "Book created"
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Error occurred",
            error: error,
        });
    };
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
    };
};

const findBookByTitle = async (req, res) => {
    try {
        const book = await Book.findOne({where: {title: req.body.title}});

        if (!book){
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
        };
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
        const book = await Book.findOne({where: { title: req.body.title}});
        if (!book){
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
        };
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Error occurred",
            error: error,
        });
    };
};

const updateAuthorByTitle = async (req, res) => {
    try {
        const book = await Book.findOne({where: {title: req.body.title}});
        if (!book){
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
        };
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
        const book = await Book.findOne({where: {title: req.body.title}});
        if (!book){
            res.status(404).json({
                success: false,
                message: "Book not found",
                title: req.body.title,
            });
        } else {
            await book.update({
                author: req.body.author,
                genre: req.body.genre
            });
            await book.save();
            res.status(200).json({
                message: "Book updated",
                book: book,
            });
        };
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
        const author = await Author.findOne({where: {name: req.body.author}});
        let id = author.id;
        const listAllBooks = await Book.findAll({where: {AuthorId: id}});
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
    };
};

module.exports = {
    addBook,
    listAllBooks,
    findBookByTitle,
    deleteBookByTitle,
    updateAuthorByTitle,
    updateBookByTitle,
    getBooksByAuthor,
}