export const formatterUtility = (amount, noSign=false) => {
    const sign = noSign ? "" : "₦";
    return `${sign}${amount.toLocaleString()}`
}