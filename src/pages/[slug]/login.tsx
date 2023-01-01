import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import swell from "swell-js"
import { useDispatch } from "react-redux"
import { setAccountDetails } from '@/store/reducers/accountSlice'
import { setCheckoutId } from '@/store/reducers/checkoutSlice'
import Image from 'next/image'

const Login: React.FC = ({ checkout_id }: any) => {
   const router = useRouter()
   const dispatch = useDispatch()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [processingLogin, setProcessingLogin] = useState(false)

   swell.init(
      process.env.NEXT_PUBLIC_SWELL_STORE as string,
      process.env.NEXT_PUBLIC_SWELL_API_TOKEN as string
   )
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setProcessingLogin(true)
      try {
         const response = await swell.account.login(email, password)
         // TODO: Add code to submit the form and log the user in
         dispatch(setAccountDetails(response))
         response !== null && await router.push(`/${checkout_id}/checkout`)
         response === null && setError("Invalid email or password")
         response === null && setProcessingLogin(true)
      } catch (error) {
         console.error(error)
         setProcessingLogin(true)
      }
   }

   const handleForgotPassword = () => {
      // TODO: Add code to redirect the user to the reset password page
      router.push(`/${checkout_id}/reset-password`)
   }
   useEffect(() => {
      dispatch(setCheckoutId(checkout_id))
   }, [])

   return (
      <form
         className="bg-white rounded px-8 pt-6 pb-8 mb-4"
         onSubmit={ handleSubmit }
      >
         <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8 mx-auto">
            <div className="w-full px-8 md:px-32 lg:px-24 mx-auto mt-20">
               <div className="bg-white rounded-md shadow-2xl p-5">
                  <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                  <p className="text-sm font-normal text-gray-600 mb-8">Welcome Back</p>
                  <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                     </svg>
                     <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" onChange={ (event) => {
                        setEmail(event.target.value)
                        setError("")
                     } } value={ email } />
                  </div>
                  <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                     </svg>
                     <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" value={ password }
                        onChange={ (event) => {
                           setPassword(event.target.value)
                           setError("")
                        } }
                        placeholder="***************" />
                  </div>
                  { error && (
                     <p className="text-red-500 mx-auto text-xs italic text-center">{ error }</p>
                  ) }
                  <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                     {
                        processingLogin ?
                           <Image src="/assets/images/loader.svg" width={ 20 } height={ 30 } className="animate-spin mx-auto" alt="loader" />
                           : <span>Login</span>
                     }
                  </button>
                  <div className="flex justify-between mt-4">
                     <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all" onClick={ handleForgotPassword }>Forgot Password ?</span>

                  </div>
               </div>
            </div>
         </div>
      </form>)
}

export default Login

export async function getServerSideProps (context: any) {
   return {
      props: {
         checkout_id: context.query.slug,
      }
   }
}