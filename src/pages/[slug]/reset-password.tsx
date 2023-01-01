import { useRouter } from 'next/router'
import React, { useState } from 'react'
import swell from "swell-js"
import Image from 'next/image'

swell.init(
   process.env.NEXT_PUBLIC_SWELL_STORE as string,
   process.env.NEXT_PUBLIC_SWELL_API_TOKEN as string
)

const ResetPassword: React.FC = ({ checkout_id }: any) => {
   const router = useRouter()
   const [key, setKey] = useState('')
   const [email, setEmail] = useState('')
   const [keyError, setKeyError] = useState('')
   const [password, setPassword] = useState('')
   const [emailError, setEmailError] = useState('')
   const [resetSuccess, setResetSuccess] = useState(false)
   const [processingReset, setProcessingReset] = useState(false)
   const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false)

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setProcessingReset(true)
      if (!resetSuccess) {
         try {
            const response: any = await swell.account.recover({
               email
            })
            console.log(response)
            !response?.success && setEmailError(() => "Invalid Email")
            setResetSuccess(() => response.success)
         } catch (error) {
            console.error(error)
         }
         setProcessingReset(false)
      } else {
         try {
            await swell.account.recover({
               password,
               reset_key: key
            })
            router.push(`/${checkout_id}/login`)
         } catch (error) {
            setKeyError(() => "Invalid Reset Key")
            console.error(error)
         }
         setProcessingReset(false)
      }
   }
   return (
      <form
         className="bg-white rounded px-8 pt-6 pb-8 mb-4"
         onSubmit={ handleSubmit }
      >
         <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8 mx-auto">
            <div className="w-full px-8 md:px-32 lg:px-24 mx-auto mt-20">
               <div className="bg-white rounded-md shadow-2xl p-5">
                  <h1 className="text-gray-800 font-bold text-2xl mb-6">Hello Again!</h1>
                  { !resetSuccess &&

                     <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" onChange={ (event) => {
                           setEmail(event.target.value)
                           setEmailError("")
                        } } value={ email } />
                     </div>
                  }
                  { resetSuccess &&
                     <>
                        <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                           </svg>
                           <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" value={ password }
                              onChange={ (event) => {
                                 setPassword(event.target.value)
                              } }
                              placeholder="***************" />
                        </div>
                        <div className="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl ">
                           <svg className="text-gray-400 h-5 w-5 bi bi-key" fill="currentColor" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" /><path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" /></svg>
                           <input id="key" className=" pl-2 w-full outline-none border-none" type="key" name="text" placeholder="Reset Key" onChange={ (event) => {
                              setKey(event.target.value)
                              setKeyError("")
                           } } value={ key } />
                        </div>
                     </> }
                  { emailError && (
                     <p className="text-red-500 mx-auto text-xs italic text-center">{ emailError }</p>
                  ) }
                  { keyError && (
                     <p className="text-red-500 mx-auto text-xs italic text-center">{ keyError }</p>
                  ) }
                  <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                     {
                        processingReset ?
                           <Image src="/assets/images/loader.svg" width={ 20 } height={ 30 } className="animate-spin mx-auto" alt="loader" />
                           : <span>{ resetSuccess ? "Change password" : "Reset password" } </span>
                     }
                  </button>
                  <div className="flex justify-between mt-4">
                     <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all" onClick={ () => {
                        router.push(`/${checkout_id}/login`)
                     } }>Back to Login</span>
                  </div>
               </div>
            </div>
         </div>
      </form>
   )
}

export default ResetPassword

export async function getServerSideProps (context: any) {
   return {
      props: {
         checkout_id: context.query.slug,
      },
   }
}