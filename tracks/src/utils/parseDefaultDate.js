export default function parseDefaultDate() {
    let today = new Date();
    let timeZone = (today.getTimezoneOffset() / 60).toString();

    var dayLastMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 28
    );

    let lastMonth =
        dayLastMonth.getFullYear() +
        "-" +
        (dayLastMonth.getMonth() + 1) +
        "-" +
        dayLastMonth.getDate();

    return [timeZone, lastMonth];
}
