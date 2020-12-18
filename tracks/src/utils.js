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
        let weight = inf.weight.toString().slice(0, 6);
        let totalCo2 = inf.total_co2_emitted.toString().slice(0, 6);
        let distance = inf.travelled_distance.toString().slice(0, 6);
        let IntensityFactor = ((totalCo2 / weight / distance) * 1000)
            .toString()
            .slice(0, 6);
        return (rowsArr[i] = {
            id: i,
            col1: inf.carrier_company_id.toString(),
            col2: totalCo2 + " GT",
            col3: distance + " km",
            col4: weight + " kg",
            col5: IntensityFactor,
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
