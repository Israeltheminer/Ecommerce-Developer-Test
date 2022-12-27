import { configureStore, Middleware, Store } from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import rootReducer from "@/store/reducers"

const middleware: Middleware[] = []

if (process.env.NODE_ENV !== "production") {
	middleware.push(createLogger())
}

export const store: Store = configureStore({
	reducer: rootReducer,
	middleware
})
