require("dotenv").config();
const express = require("express");

const Book = require("./books/model");
const Author = require("./authors/model");
const Genre = require("./genres/model");

const bookRouter = require("./books/routes");
const authorRouter = require("./authors/routes");
const genreRouter = require("./genres/routes");

// 80 is default so not needed in local host url
const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

// http://localhost/books/(allroutenames)
app.use("/books", bookRouter);

app.use("/authors", authorRouter);

app.use("/genres", genreRouter);

Author.hasMany(Book);
Book.belongsTo(Author);

const syncTables = () => {
    Book.sync();
    Author.sync();
    Genre.sync();
};

// http://localhost/health
app.get("/health", (req, res) => {
    res.status(200).json({message: "API is healthy."});
});

app.listen(port, () => {
    syncTables();
    console.log(`App is listening on port ${port}.`);
});