const {Router} = require("express");
const authorRouter = Router();
const Author = require("./model");
const {addAuthor} = require("./controllers");

// Request to add an author
authorRouter.post("/addauthor", addAuthor);

// Request to get all authors from author table
authorRouter.get("/listallauthors", async (req, res) => {
    try {
        const listAllAuthors = await Author.findAll({});
        res.status(200).json({
            message: "Success",
            authors: listAllAuthors,
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Error occurred",
            error: error,
        });
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