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

// Request to delete author from author table
authorRouter.delete("/deleteauthor", async (req, res) => {
    try {
        const author = await Author.findOne({where: {name: req.body.name}});
        if (!author){
            res.status(404).json({
                success: false,
                message: "Author not found",
                name: req.body.name,
            });
        } else {
            await author.destroy();
            res.status(200).json({
                message: "Author deleted",
                author: author,
            });
        };
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Error occurred",
            error: error,
        });
    };
});

module.exports = authorRouter;