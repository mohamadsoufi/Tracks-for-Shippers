const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:website_platooning_dev:password@localhost:5432/tracks"
);

module.exports.getDefaultData = (lastMonth, timeZone) => {
    let q = `SELECT * FROM homework.shipments
     WHERE start_time > $1::timestamp with time zone at time zone $2`;
    return db.query(q, [lastMonth, timeZone]);
};

module.exports.getData = () => {
    let q = `SELECT * FROM homework.shipments`;
    return db.query(q);
};

module.exports.getSelectedDate = (start, end) => {
    let q = `SELECT * FROM homework.shipments
     WHERE creation_timestamp BETWEEN $1 AND $2`;
    return db.query(q, [start, end]);
};
