export const getFormattedDate = (): string => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    // Extract the day and add the ordinal suffix
    const day = date.getDate();
    const suffix = (day % 10 === 1 && day !== 11) ? "st" :
        (day % 10 === 2 && day !== 12) ? "nd" :
            (day % 10 === 3 && day !== 13) ? "rd" : "th";

    return formattedDate.replace(/\d+/, `${day}${suffix}`);
};