const Book = require("./model");

const addBook = async (req, res) => {
    console.log(req.body);
    try {
        const book = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
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

// const findBookbyTitle

module.exports = {
    addBook,
    listAllBooks,
}