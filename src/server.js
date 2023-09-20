const express = require("express");

// 80 is default so not needed in local host url
const port = 80;

const app = express();

app.use(express.json());

// http://localhost/health
app.get("/health", (req, res) => {
    res.status(200).json({message: "API is healthy."});
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}.`);
});