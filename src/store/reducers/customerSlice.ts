import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ShippingInfo {
	firstname: string
	lastname: string
	company: string
	country: string
	province: string
	city: string
	postal: string
	address: string
	apartment: string
	phonenumber: string
	saveShippingInfo: boolean
}
interface ContactInfo {
	email: string
	keepUpToDate: boolean
	password: string
	isRegistered: boolean
}
interface CustomerState {
	contactInformation: ContactInfo
	shippingInformation: ShippingInfo
}

const initialState: CustomerState = {
	contactInformation: {
		email: "",
		password: "",
		isRegistered: false,
		keepUpToDate: false
	},
	shippingInformation: {
		firstname: "",
		lastname: "",
		company: "",
		city: "",
		country: "",
		province: "",
		postal: "",
		address: "",
		apartment: "",
		phonenumber: "",
		saveShippingInfo: false
	}
}

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {
		setContactInformation(state: CustomerState, action: PayloadAction<ContactInfo>) {
			state.contactInformation = action.payload
		},
		setShippingInformation(state: CustomerState, action: PayloadAction<ShippingInfo>) {
			state.shippingInformation = action.payload
		},
		setAsRegistered(state: CustomerState) {
			state.contactInformation.isRegistered = true
		}
	}
})

export const { setContactInformation, setShippingInformation, setAsRegistered } = customerSlice.actions

export default customerSlice.reducer
