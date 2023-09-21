const Genre = require("./model");

const addGenre = async (req, res) => {
    try {
        console.log(req.body);
            const genre = await Genre.create({
                genre: req.body.genre
            });
            res.status(201).json({
                genre: genre,
                message: "Genre added"
            });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            message: "Error occurred",
            error: error,
        });
    }
};

module.exports = {
    addGenre,
}