import { combineReducers } from "@reduxjs/toolkit"
import customerReducer from "@/store/reducers/customerSlice"
import checkoutReducer from "@/store/reducers/checkoutSlice"
import shippingReducer from "@/store/reducers/shippingSlice"
import orderReducer from "@/store/reducers/orderSlice"
import paymentReducer from "@/store/reducers/paymentSlice"

const rootReducer = combineReducers({
	customer: customerReducer,
	checkout: checkoutReducer,
	shipping: shippingReducer,
	payment: paymentReducer,
	order: orderReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
