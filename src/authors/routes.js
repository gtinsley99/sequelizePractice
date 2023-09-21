const {Router} = require("express");
const authorRouter = Router();
const Author = require("./model");

// Request to add an author
authorRouter.post("/addauthor", async (req, res) => {
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
authorRouter.get("/listallauthors", async (req, res) => {
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

module.exports = authorRouter;