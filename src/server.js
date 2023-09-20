require("dotenv").config();
const express = require("express");

// 80 is default so not needed in local host url
const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

const { DataTypes } = require("sequelize");
const connection = require("./db/connection");

// Class on db entry info
const Book = connection.define("Book", {
    title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.STRING
    }
});

const syncTables = () => {
    Book.sync();
};

// Request to add a book to the db
app.post("/addbook", async (req, res) => {
    console.log(req.body);
    try {
        const book = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
        });
    
        const successResponse = {
            book: book,
            message: "Book created"
        };
    
        res.status(201).json(successResponse);
    } catch (error) {
        console.log(error);
        const errorResponse = {
            message: "Error occurred",
            error: error,
        };
        res.status(501).json(errorResponse);
    };
});

// Request to get all books from db
app.get("/listallbooks", async (req, res) => {
    try {
        const listAllBooks = await Book.findAll({});

        const successResponse = {
            message: "Success",
            books: listAllBooks,
        };
        res.status(200).json(successResponse);
    } catch (error) {
        console.log(error);
        const errorResponse = {
            message: "Error occurred",
            error: error,
        };
        res.status(501).json(errorResponse);
    };
});

// Request to get one book from db by title
app.get("/findbookbytitle", async (req, res) => {
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
app.delete("/deletebookbytitle", async (req, res) => {
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
app.put("/updateauthorbytitle", async (req, res) => {
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
app.put("/updatebookbytitle", async (req, res) => {
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

// http://localhost/health
app.get("/health", (req, res) => {
    res.status(200).json({message: "API is healthy."});
});

app.listen(port, () => {
    syncTables();
    console.log(`App is listening on port ${port}.`);
});