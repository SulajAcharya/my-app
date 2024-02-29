// export const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD"
//     }).format(price)
// }

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(price)
}
