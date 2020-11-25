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
    let { lastMonth, timeZone } = req.query;
    db.getDefaultData(lastMonth, timeZone).then(({ rows }) => {
        res.json(rows);
    });
});

app.get("/all-data", function (req, res) {
    db.getData().then(({ rows }) => {
        res.json(rows);
    });
});

app.get("/selected-date", function (req, res) {
    let { start, endDate, timeZone } = req.query;

    db.getSelectedDate(start, endDate, timeZone).then(({ rows }) => {
        // console.log("rows :", rows);

        res.json(rows);
    });
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || port, function () {
    console.log(`I'm listening on port ${port}.`);
});
