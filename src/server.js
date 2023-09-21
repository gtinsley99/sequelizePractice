require("dotenv").config();
const express = require("express");

const Book = require("./books/model");
const Author = require("./authors/model");

const bookRouter = require("./books/routes");

// 80 is default so not needed in local host url
const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

// http://localhost/books/(allroutenames)
app.use("/books", bookRouter);

Author.hasMany(Book);
Book.belongsTo(Author);

const syncTables = () => {
    Author.sync()
    Book.sync();
};

// Routes for author table

// Request to add an author to the author table
app.post("/addauthor", async (req, res) => {
    console.log(req.body);
    try {
        const author = await Author.create({
            name: req.body.name,
        });
    
        const successResponse = {
            author: author,
            message: "Author added"
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

// Request to get all authors from author table
app.get("/listallauthors", async (req, res) => {
    try {
        const listAllAuthors = await Author.findAll({});

        const successResponse = {
            message: "Success",
            authors: listAllAuthors,
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