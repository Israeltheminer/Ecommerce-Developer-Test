import { createAsyncThunk } from "@reduxjs/toolkit"
import swell from "."

export const getCart: any = createAsyncThunk("cardSlice/getCart", async (name, thunkApi) => {
	try {
		const response = await swell.cart.get()
		return response
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})
