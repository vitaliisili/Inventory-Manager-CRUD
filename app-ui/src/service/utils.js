export const convertDate = (date) => {
    const dateFormat = new Date(date)
    return `${dateFormat.getDate()}-${dateFormat.getMonth()}-${dateFormat.getFullYear()}`
}