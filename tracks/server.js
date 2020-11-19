const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./db");
const port = 8081;
app.use(express.static(path.join(__dirname, "build")));

app.get("/ping", function (req, res) {
    return res.send("pong");
});

app.get("/api", function (req, res) {
    db.getData().then(({ rows }) => {
        res.json(rows);
    });
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || port, function () {
    console.log(`I'm listening on port ${port}.`);
});
