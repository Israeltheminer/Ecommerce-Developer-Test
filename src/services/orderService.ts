import { createAsyncThunk } from "@reduxjs/toolkit"
import swell from "."

export const getCart: any = createAsyncThunk("orderSlice/getCart", async (name, thunkApi) => {
	const state: any = thunkApi.getState()
	const {id} = state.checkout
	try {
		// @ts-ignore
		const response = await swell.cart.recover(id)
		return response
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})
