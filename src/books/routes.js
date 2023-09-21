const { Router } = require("express");
const bookRouter = Router();
const Book = require("./model");
const {addBook, listAllBooks} = require("./controllers");

// Request to add a book to the db
bookRouter.post("/addbook", addBook);

// Request to get all books from db
bookRouter.get("/listallbooks", listAllBooks);

// Request to get one book from db by title
bookRouter.get("/findbookbytitle", async (req, res) => {
    try {
        const filter = {title: req.body.title};
        const book = await Book.findOne({where: filter});

        if (!book){
            const noBookRes = {
                success: false,
                message: "Book not found",
                title: req.body.title,
            };
            res.status(404).json(noBookRes);
        } else {
            const successResponse = {
                message: "Book found",
                book: book,
            };
            res.status(200).json(successResponse);
        };
    } catch (error) {
        console.log(error);
        const errorResponse = {
            message: "Error occurred",
            error: error,
        };
        res.status(501).json(errorResponse);
    }
});

// Request to delete book by title from db
bookRouter.delete("/deletebookbytitle", async (req, res) => {
    try {
        const filter = { title: req.body.title};
        const book = await Book.findOne({where: filter});
        if (!book){
            const noBookRes = {
                success: false,
                message: "Book not found",
                title: req.body.title,
            };
            res.status(404).json(noBookRes);
        } else {
            await book.destroy();
            const successResponse = {
                message: "Book deleted",
                book: book,
            };
            res.status(200).json(successResponse);
        };
    } catch (error) {
        console.log(error);
        const errorResponse = {
            message: "Error occurred",
            error: error,
        };
        res.status(501).json(errorResponse);
    };
});

// Request to update author by title
bookRouter.put("/updateauthorbytitle", async (req, res) => {
    try {
        const filter = {title: req.body.title};
        const book = await Book.findOne({where: filter});
        if (!book){
            const noBookRes = {
                success: false,
                message: "Book not found",
                title: req.body.title,
            };
            res.status(404).json(noBookRes);
        } else {
            book.author = req.body.author;
            await book.save();
            const successResponse = {
                message: "Author updated",
                book: book,
            };
            res.status(200).json(successResponse);
        };
    } catch (error) {
        console.log(error);
        const errorResponse = {
            message: "Error occurred",
            error: error,
        };
        res.status(501).json(errorResponse);
    }
});

// Request to update author/genre by title
bookRouter.put("/updatebookbytitle", async (req, res) => {
    try {
        const filter = {title: req.body.title};
        const book = await Book.findOne({where: filter});
        if (!book){
            const noBookRes = {
                success: false,
                message: "Book not found",
                title: req.body.title,
            };
            res.status(404).json(noBookRes);
        } else {
            await book.update({
                author: req.body.author,
                genre: req.body.genre
            });
            await book.save();
            const successResponse = {
                message: "Book updated",
                book: book,
            };
            res.status(200).json(successResponse);
        };
    } catch (error) {
        console.log(error);
        const errorResponse = {
            message: "Error occurred",
            error: error,
        };
        res.status(501).json(errorResponse);
    }
});

module.exports = bookRouter;