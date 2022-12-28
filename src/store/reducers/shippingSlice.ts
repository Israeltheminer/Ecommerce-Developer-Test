import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ShippingState {
	email: string
	instructions: string
}

const initialState: ShippingState = {
	email: "",
	instructions: ""
}

const ShippingSlice = createSlice({
	name: "shipping",
	initialState,
	reducers: {
		setEmail(state: ShippingState, action: PayloadAction<string>) {
			state.email = action.payload
		},
		setInstructions(state: ShippingState, action: PayloadAction<string>) {
			state.instructions = action.payload
		}
	}
})

export const { setEmail, setInstructions } = ShippingSlice.actions

export default ShippingSlice.reducer
