export const getPrice = (price: string | number | undefined, currency: string) => {
	return new Intl.NumberFormat(undefined, {
		currency: currency,
		minimumFractionDigits: 2,
		style: "currency"
	}).format(parseFloat(price ? `${price}` : "0"))
}
