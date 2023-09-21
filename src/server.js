require("dotenv").config();
const express = require("express");

const Book = require("./books/model");
const Author = require("./authors/model");

const bookRouter = require("./books/routes");
const authorRouter = require("./authors/routes");

// 80 is default so not needed in local host url
const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

// http://localhost/books/(allroutenames)
app.use("/books", bookRouter);

app.use("/authors", authorRouter);

Author.hasMany(Book);
Book.belongsTo(Author);

const syncTables = () => {
    Author.sync()
    Book.sync();
};

// Routes for author table


// Request to delete author from author table
app.delete("/deleteauthor", async (req, res) => {
    try {
        const filter = { name: req.body.name};
        const author = await Author.findOne({where: filter});
        if (!author){
            const noAuthorRes = {
                success: false,
                message: "Author not found",
                name: req.body.name,
            };
            res.status(404).json(noAuthorRes);
        } else {
            await author.destroy();
            const successResponse = {
                message: "Author deleted",
                author: author,
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




// http://localhost/health
app.get("/health", (req, res) => {
    res.status(200).json({message: "API is healthy."});
});

app.listen(port, () => {
    syncTables();
    console.log(`App is listening on port ${port}.`);
});