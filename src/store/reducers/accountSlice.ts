import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: any = {}

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		setAccountDetails(state: any, action: PayloadAction<any>) {
			state = action.payload
			return action.payload
		}
	}
})

export const { setAccountDetails } = accountSlice.actions
export default accountSlice.reducer
