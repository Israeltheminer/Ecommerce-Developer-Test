import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CheckoutState {
	stage: "customer" | "shipping" | "payment" | "thanks"
}

const initialState: CheckoutState = {
	stage: "customer"
}

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		setCheckoutStage(state: CheckoutState, action: PayloadAction<CheckoutState>) {
			state.stage = action.payload.stage
		}
	}
})

export const { setCheckoutStage } = checkoutSlice.actions

export default checkoutSlice.reducer
