import { combineReducers } from "@reduxjs/toolkit"
import customerReducer from "@/store/reducers/customerSlice"
import checkoutReducer from "@/store/reducers/checkoutSlice"
import shippingReducer from "@/store/reducers/shippingSlice"
import orderReducer from "@/store/reducers/orderSlice"

const rootReducer = combineReducers({
	customer: customerReducer,
	checkout: checkoutReducer,
	shipping: shippingReducer,
	order: orderReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
