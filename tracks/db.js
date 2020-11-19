const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:website_platooning_dev:password@localhost:5432/tracks"
);

module.exports.getData = () => {
    let q = `SELECT * FROM homework.shipments`;

    return db.query(q);
};
