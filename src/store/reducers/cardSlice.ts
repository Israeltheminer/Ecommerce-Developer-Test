import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getCards } from "@/services/cardService"

const initialState: any = {}

const cardSlice = createSlice({
	name: "cards",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCards.fulfilled, (state: any, action: PayloadAction<any>) => {
			return { ...state, ...action.payload }
		})
	}
})

export default cardSlice.reducer
