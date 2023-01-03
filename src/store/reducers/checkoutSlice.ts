import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CheckoutState {
	stage: "customer" | "shipping" | "payment" | "thanks"
	id: string
}

const initialState: CheckoutState = {
	stage: "customer",
	id: ""
}

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		setCheckoutStage(state: CheckoutState, action: PayloadAction<"customer" | "shipping" | "payment" | "thanks">) {
			state.stage = action.payload
			window.scrollTo(0, 0)
		},
		setCheckoutId(state: CheckoutState, action: PayloadAction<string>) {
			state.id = action.payload
		}
	}
})

export const { setCheckoutStage, setCheckoutId } = checkoutSlice.actions

export default checkoutSlice.reducer
