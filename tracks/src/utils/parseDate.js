export default function parseDate(date) {
    let timeZone = (date.getTimezoneOffset() / 60).toString();

    let day =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    return [timeZone, day];
}
