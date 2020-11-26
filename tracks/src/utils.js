export function parseDefaultDate() {
    let today = new Date();
    let timeZone = (today.getTimezoneOffset() / 60).toString();

    var dayLast10Weeks = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 70
    );

    let last10Weeks =
        dayLast10Weeks.getFullYear() +
        "-" +
        (dayLast10Weeks.getMonth() + 1) +
        "-" +
        dayLast10Weeks.getDate();

    return [timeZone, last10Weeks];
}

export function parseDate(date) {
    let timeZone = (date.getTimezoneOffset() / 60).toString();

    let day =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    return [day, timeZone];
}

export function rowMaker(info) {
    let rowsArr = [];
    info.map((inf, i) => {
        return (rowsArr[i] = {
            id: i,
            col1: inf.carrier_company_id.toString(),
            col2: inf.total_co2_emitted.toString().slice(0, 6) + " GT",
            col3: inf.travelled_distance.toString().slice(0, 6) + " km",
            col4: inf.weight.toString().slice(0, 6) + " kg",
            col5: "i don't know yet",
        });
    });
    return rowsArr;
}

export function makeUnique(available) {
    let uniqAvailable = [...new Set(available)];
    let valList = [];
    uniqAvailable.forEach((val) => {
        valList.push([val]);
    });

    return uniqAvailable;
}
