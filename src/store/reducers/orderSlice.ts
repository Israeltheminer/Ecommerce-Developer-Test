import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCart } from "@/services/orderService"

const initialState: any = {}

const OrderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCart.fulfilled, (state: any, action: PayloadAction<any>) => {
			state = action.payload
			return { ...state, ...action.payload }
		})
	}
})

export default OrderSlice.reducer
