import '../styles/global.css'
import { useEffect } from "react"
import { Provider } from "react-redux"
import { Store } from 'redux'
import { store } from "@/store/store"
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (window?.Cypress) {
      window.store = store as Store
    }
  }, [])
  return (
    <Provider store={ store }>
      <Component { ...pageProps } />
    </Provider>
  )
}

export default MyApp
