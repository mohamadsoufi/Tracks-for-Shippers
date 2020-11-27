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
    let { last10Weeks, timeZone } = req.query;
    db.getDefaultData(last10Weeks, timeZone).then(({ rows }) => {
        res.json(rows);
    });
});

app.get("/all-data", function (req, res) {
    db.getData()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((err) => {
            console.log("err :", err);
        });
});

app.get("/selected-date", function (req, res) {
    let { start, endDate, timeZone } = req.query;
    let end = endDate[0];
    db.getSelectedDate(start, end, timeZone).then(({ rows }) => {
        res.json(rows);
    });
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || port, function () {
    console.log(`I'm listening on port ${port}.`);
});
