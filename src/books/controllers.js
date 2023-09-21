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

const findBookbyTitle = async (req, res) => {
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
}

module.exports = {
    addBook,
    listAllBooks,
    findBookbyTitle,
    deleteBookByTitle,
}