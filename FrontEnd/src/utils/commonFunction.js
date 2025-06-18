export function DateTimeDisplay_1(dateTime) {
    // Chuyển đổi chuỗi thời gian sang đối tượng Date
    try {

        if (!dateTime) return "";

        const date = new Date(dateTime);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        return formattedDateTime;
    } catch (e) {
        console.error(e);
        return ''
    }

}


export function formatDateToDdMmYyyy(date) {
    if (!date) return "";
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en', options).format(date);
}

export function formatNumberWithCommasAndDecimals(number, decimalPlaces = 2) {
    try {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
        }).format(number);
    } catch (e) {
        console.error(e);
        return ''
    }
};

export function formatNumberWithCommas(number) {
    try {
        return new Intl.NumberFormat('en-US').format(number);
    } catch (e) {
        console.error(e);
        return ''
    }
};
