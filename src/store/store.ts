import { configureStore, Middleware, getDefaultMiddleware, Store } from "@reduxjs/toolkit"
import rootReducer from "@/store/reducers"
import thunkMiddleware from "redux-thunk"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
	key: "root",
	storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store: Store = configureStore({
	reducer: persistedReducer,
	middleware: [
		thunkMiddleware,
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
	]
})

export const persistor = persistStore(store)
