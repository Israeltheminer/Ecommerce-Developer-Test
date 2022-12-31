import { useRouter } from 'next/router'
import React, { useState } from 'react'

const ResetPassword: React.FC = () => {
   const router = useRouter()
   const [email, setEmail] = useState('')
   const [error, setError] = useState('')

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      // TODO: Add code to submit the form and send a password reset email
      router.push('/login')
   }

   return (
      <form
         className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
         onSubmit={ handleSubmit }
      >
         { error && (
            <p className="text-red-500 text-xs italic">{ error }</p>
         ) }
         <div className="mb-4">
            <label
               className="block text-gray-700 text-sm font-bold mb-2"
               htmlFor="email"
            >
               Email
            </label>
            <input
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="email"
               type="email"
               value={ email }
               onChange={ (event) => setEmail(event.target.value) }
               placeholder="Email"
            />
         </div>
         <div className="flex items-center justify-between">
            <button
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="submit"
            >
               Send Password Reset Email
            </button>
            <a
               className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
               href="/login"
            >
               Back to Login
            </a>
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