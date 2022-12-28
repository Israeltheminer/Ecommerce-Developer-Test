import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Orderstate {
	id: string
	name: string
	price: string
	shipping: "express" | "standard"
}

interface AllOrdersState {
	orders: Orderstate[]
	discount: string
}

const initialState: AllOrdersState = {
	orders: [
		{
			id: "1",
			name: "WOODEN MA R21",
			price: "$35.00",
			shipping: "standard"
		},
		{
			id: "2",
			name: "WOODEN MA R21",
			price: "$35.00",
			shipping: "standard"
		}
	],
	discount: ""
}

const OrderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setDiscount(state: AllOrdersState, action: PayloadAction<string>) {
			state.discount = action.payload
		},
		changeShipping(state: AllOrdersState, action: PayloadAction<{ order: Orderstate; shipping: "express" | "standard" }>) {
			const prevOrders = state.orders
			const filteredOrders = prevOrders.filter((order) => order.id !== action.payload.order.id)
			state.orders = [...filteredOrders, { ...action.payload.order, shipping: action.payload.shipping }]
		}
	}
})

export const { setDiscount, changeShipping } = OrderSlice.actions

export default OrderSlice.reducer
