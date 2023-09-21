const Author = require("./model");

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

module.exports = {
    addAuthor,
}