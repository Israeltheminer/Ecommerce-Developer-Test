import { combineReducers } from "@reduxjs/toolkit"
import customerReducer from "@/store/reducers/customerSlice"
import checkoutReducer from "@/store/reducers/checkoutSlice"
import shippingReducer from "@/store/reducers/shippingSlice"
import orderReducer from "@/store/reducers/orderSlice"
import paymentReducer from "@/store/reducers/paymentSlice"
import cardReducer from "@/store/reducers/cardSlice"
import accountReducer from "@/store/reducers/accountSlice"

const rootReducer = combineReducers({
	customer: customerReducer,
	checkout: checkoutReducer,
	shipping: shippingReducer,
	account: accountReducer,
	cards: cardReducer,
	payment: paymentReducer,
	order: orderReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
