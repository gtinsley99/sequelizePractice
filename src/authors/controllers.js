const Author = require("./model");
const Book = require("../books/model");

const addAuthor = async (req, res) => {
    console.log(req.body);
    try {
        const author = await Author.create({
            name: req.body.name,
        });
        res.status(201).json({
            author: author,
            message: "Author added"
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Error occurred",
            error: error,
        });
    };
};

const listAllAuthors = async (req, res) => {
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
};

const deleteAuthor = async (req, res) => {
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
};

const getAuthor = async (req, res) => {
    try {
        const getAuthor = await Author.findOne({where: {name: req.body.name}});
        let id = getAuthor.id
        const getBooks = await Book.findAll({where: {AuthorId: id}})
        res.status(200).json({
            message: "Success",
            author: getAuthor.name,
            books: getBooks,
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Error occurred",
            error: error,
        });
    };
};

module.exports = {
    addAuthor,
    listAllAuthors,
    deleteAuthor,
    getAuthor,
}