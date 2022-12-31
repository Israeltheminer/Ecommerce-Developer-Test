import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ShippingType {
	id: string
	shipping: string
	name: string
	quantity: number
}

interface ShippingDetails {
	email: string
	instructions: string
	orders: any[]
}

const initialState: ShippingDetails = {
	email: "",
	instructions: "",
	orders: []
}

const ShippingSlice = createSlice({
	name: "shipping",
	initialState,
	reducers: {
		setEmail(state: ShippingDetails, action: PayloadAction<string>) {
			state.email = action.payload
		},
		setInstructions(state: ShippingDetails, action: PayloadAction<string>) {
			state.instructions = action.payload
		},
		setOrders(state: ShippingDetails, action: PayloadAction<ShippingType[]>) {
			state.orders = action.payload
		},
		changeShipping(state: ShippingDetails, action: PayloadAction<{ order: ShippingType; shipping: "express" | "standard" }>) {
			const prevOrders = state.orders
			const filteredOrders = prevOrders.filter((order) => order.id !== action.payload.order.id)
			const arrangedOrders = [...filteredOrders, { ...action.payload.order, shipping: action.payload.shipping }]
			arrangedOrders.sort((a, b) => {
				if (a.id < b.id) {
					return -1
				}
				if (a.id > b.id) {
					return 1
				}
				return 0
			})
			state.orders = arrangedOrders
		}
	}
})

export const { setEmail, setInstructions, setOrders, changeShipping } = ShippingSlice.actions

export default ShippingSlice.reducer
