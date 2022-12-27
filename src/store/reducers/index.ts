import { combineReducers } from "@reduxjs/toolkit"
import customerReducer from "@/store/reducers/customerSlice"

const rootReducer = combineReducers({
	customer: customerReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
