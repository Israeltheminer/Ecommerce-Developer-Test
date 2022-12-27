import '../styles/global.css'
import { Provider } from "react-redux"
import { store } from "@/store/store"
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={ store }>
    <Component { ...pageProps } />
  </Provider>
)

export default MyApp
