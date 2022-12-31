import { createAsyncThunk } from "@reduxjs/toolkit"
import cardValidator from "card-validator"
import swell from "."

export const getCards: any = createAsyncThunk("cardSlice/getCards", async (name, thunkApi) => {
	try {
		const response = await swell.account.listCards()
		return response
	} catch (error: any) {
		return thunkApi.rejectWithValue(error.response.data)
	}
})
export const addCardToVault: any = createAsyncThunk("cardSlice/addCardToVault", async (name, thunkApi) => {
	const state: any = thunkApi.getState()
	const { address, country, city, postal, apartment } = state.customer.shippingInformation
	const { number, expiry, code } = state.payment.cardDetails
	const { id } = state.account
	const { month, year } = cardValidator.expirationDate(expiry)
	const exp_month = month as string
	const exp_year = year as string

	try {
		const tokenResponse: any = await swell.card.createToken({
			number,
			exp_month: parseInt(exp_month),
			exp_year: parseInt(`20${exp_year}`),
			cvc: code,
			account_id: id,
			billing: {
				address1: `${apartment} ${address}`,
				zip: postal,
				city,
				country
			}
		})
		if (tokenResponse.token) {
			const response = await swell.account.createCard({
				token: tokenResponse?.token
			})
			return response
		}
	} catch (error: any) {
		console.log(error)
		return thunkApi.rejectWithValue(error.response.data)
	}
})
export const addCardToCart: any = createAsyncThunk("cardSlice/addCardToCart", async (name, thunkApi) => {
	const state: any = thunkApi.getState()
	const { address, country, city, postal, apartment } = state.customer.shippingInformation
	const { number, expiry, code } = state.payment.cardDetails
	const { id } = state.account
	const { month, year } = cardValidator.expirationDate(expiry)
	const exp_month = month as string
	const exp_year = year as string

	try {
		const tokenResponse: any = await swell.card.createToken({
			number,
			exp_month: parseInt(exp_month),
			exp_year: parseInt(`20${exp_year}`),
			cvc: code,
			account_id: id,
			billing: {
				address1: `${apartment} ${address}`,
				zip: postal,
				city,
				country
			}
		})
		await swell.cart.update({
			billing: {
				card: tokenResponse
			}
		})
	} catch (error: any) {
		console.log(error)
		return thunkApi.rejectWithValue(error.response.data)
	}
})
