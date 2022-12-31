import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface PaymentState {
	paymentMethod: "creditCard" | "paypal" | "bankTransfer"
	billingAddress: "shipping" | "other"
	agreedToTerms: boolean
	cardDetails: {
		number: string
		name: string
		expiry: string
		code: string
	}
}

const initialState: PaymentState = {
	paymentMethod: "creditCard",
	billingAddress: "shipping",
	agreedToTerms: false,
	cardDetails: {
		number: "",
		name: "",
		expiry: "",
		code: ""
	}
}

const PaymentSlice = createSlice({
	name: "payment",
	initialState,
	reducers: {
		setPaymentMethod(state: PaymentState, action: PayloadAction<"creditCard" | "paypal" | "bankTransfer">) {
			state.paymentMethod = action.payload
		},
		setBillingAddress(state: PaymentState, action: PayloadAction<"shipping" | "other">) {
			state.billingAddress = action.payload
		},
		setAgreementToTerms(state: PaymentState) {
			const prevAgreement = state.agreedToTerms
			state.agreedToTerms = !prevAgreement
		},
		setCardDetails(state: PaymentState, action: PayloadAction<{ type: "number" | "name" | "expiry" | "code"; value: string }>) {
			const prevDetails = state.cardDetails
			state.cardDetails = { ...prevDetails, [action.payload.type]: action.payload.value }
		}
	}
})

export const { setPaymentMethod, setBillingAddress, setAgreementToTerms, setCardDetails } = PaymentSlice.actions

export default PaymentSlice.reducer
