import { useDispatch, useSelector } from "react-redux"
import { RootState } from '@/store/reducers'
import { setContactInformation, setShippingInformation, setAsRegistered } from "@/store/reducers/customerSlice"
import { setCheckoutStage } from "@/store/reducers/checkoutSlice"
import { useState } from "react"

/**
 * A component that collects customer and basic shipping information from customer.
 * @returns {JSX.Element} The rendered checkout process.
 */
const Customer = () => {
   const customer = useSelector((state: RootState) => state.customer)
   const dispatch = useDispatch()
   const [invalidInputs, setInvalidInputs] = useState<string[]>([])
   const [invalidErrortDisplay, setInvalidErrortDisplay] = useState(false)

   /**
   * Handles the addition or removal of an input from the invalid input array dependent on the input content, accepts an object param including the input name and input value.
   */
   const handleInvalidInputs = ({ name, value }: { name: string; value: string | boolean }) => {
      if (value) {
         const response = invalidInputs.filter((item) => item !== name)
         setInvalidInputs(() => response)
         !response.length && setInvalidErrortDisplay(() => false)
      } else {
         const response = [...invalidInputs, name]
         const included = invalidInputs.includes(name)
         !included && setInvalidInputs(() => response)
      }
   }

   /**
   * Function handles all inputs and state of shipping related information, dispatching changes to the redux store.
   */
   const handleShippingInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
      const name = event.target.name
      const shippingInfo = {
         ...customer.shippingInformation,
         [name]: value
      }
      if (event.target.type !== "checkbox" && name !== "apartment" && name !== "company") {
         handleInvalidInputs({ name, value })
      }
      dispatch(setShippingInformation(shippingInfo))
   }

   /**
   * Function handles all inputs and state of contact related information, dispatching changes to the redux store.
   */
   const handleContactInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
      const name = event.target.name
      const contactInfo = {
         ...customer.contactInformation,
         [name]: value
      }
      if (event.target.type !== "checkbox") {
         handleInvalidInputs({ name, value })
      }
      dispatch(setContactInformation(contactInfo))
   }

   /**
   * Function validates the state within the redux customerSLice, either moving on to shipping if validation returns true and prompting user to take action if the returned value is false. 
   */
   const validateCustomerInfo = () => {
      const address = customer.shippingInformation.address
      const country = customer.shippingInformation.country
      const firstname = customer.shippingInformation.firstname
      const lastname = customer.shippingInformation.lastname
      const postal = customer.shippingInformation.postal
      const province = customer.shippingInformation.province
      const phonenumber = customer.shippingInformation.phonenumber
      const email = customer.contactInformation.email
      let invalid = []
      !address && invalid.push("address")
      !country && invalid.push("country")
      !firstname && invalid.push("firstname")
      !lastname && invalid.push("lastname")
      !postal && invalid.push("postal")
      !province && invalid.push("province")
      !phonenumber && invalid.push("phonenumber")
      !email && invalid.push("email")
      if (address && country && firstname && lastname && postal && province && phonenumber && email) {
         return { status: true, invalid }
      } else {
         return { status: false, invalid }
      }
   }
   return (
      <div className='flex flex-col gap-10'>
         {
            !customer.contactInformation.isRegistered &&
            <div className='flex flex-col gap-6'>
               <div className='flex justify-between items-center'>
                  <h1 className='font-bold text-xl text-[#262323]'>Customer Information</h1>
                  <span className='flex text-base items-center gap-6'>
                     <p>Already have an account?</p>
                     <p className='text-[#BDA25c]'>Log in</p>
                  </span>
               </div>
               <input className='base-input w-full' type="email" name="email" placeholder='Email Address' onChange={ handleContactInfo } style={ { border: invalidInputs.includes("email") ? "1px solid #df4545" : "" } } value={ customer.contactInformation.email } />
               <input className='base-input w-full' type="password" placeholder="Create Password" style={ { border: invalidInputs.includes("[password]") ? "1px solid #df4545" : "" } } />
               <span>
                  <input className='base-checkbox' type="checkbox" name="keepUpToDate" onChange={ handleContactInfo } checked={ customer.contactInformation.keepUpToDate } />
                  <label htmlFor="keepUpToDate" className='text-base ml-2'>
                     Keep me up to date with news and special offers
                  </label>
               </span>
            </div>
         }
         <div className="flex flex-col gap-6">
            <h1 className='font-bold text-xl text-[#262523]'>Shipping Address</h1>
            <div className='flex justify-between gap-5 items-center'>
               <input type="text" name="firstname" className='base-input w-full' placeholder='First name' onChange={ handleShippingInfo } style={ { border: invalidInputs.includes("firstname") ? "1px solid #df4545" : "" } } value={ customer.shippingInformation.firstname } />
               <input type="text" name="lastname" onChange={ handleShippingInfo } placeholder='Last name' className='base-input w-full' style={ { border: invalidInputs.includes("lastname") ? "1px solid #df4545" : "" } } value={ customer.shippingInformation.lastname } />
            </div>
            <input type="text" name="company" onChange={ handleShippingInfo } className='base-input' placeholder='Company (optional)' />
            <div className='flex justify-between gap-5 items-center'>
               <input type="text" placeholder='Country' name="country" onChange={ handleShippingInfo } className='base-input' style={ { border: invalidInputs.includes("country") ? "1px solid #df4545" : "" } } value={ customer.shippingInformation.country } />
               <input type="text" name="province" onChange={ handleShippingInfo } placeholder='State / Province' className='base-input max-w-[180px]' style={ { border: invalidInputs.includes("province") ? "1px solid #df4545" : "" } } value={ customer.shippingInformation.province } />
               <input type="text" name="postal" onChange={ handleShippingInfo } placeholder='Zip / Postal' className='base-input max-w-[130px]' style={ { border: invalidInputs.includes("postal") ? "1px solid #df4545" : "" } } value={ customer.shippingInformation.postal } />
            </div>
            <div className='flex justify-between gap-5 items-center'>
               <input type="text" name="address" onChange={ handleShippingInfo } placeholder='Address' className='base-input w-full' style={ { border: invalidInputs.includes("address") ? "1px solid #df4545" : "" } } value={ customer.shippingInformation.address } />
               <input type="text" placeholder='Apt, etc. (optional)' name="apartment" onChange={ handleShippingInfo } className='base-input' value={ customer.shippingInformation.apartment } />
            </div>
            <input type="tel" name="phonenumber" onChange={ handleShippingInfo } placeholder='Phone number' className='base-input' style={ { border: invalidInputs.includes("phonenumber") ? "1px solid #df4545" : "" } } value={ customer.shippingInformation.phonenumber } />
            <span>
               <input type="checkbox" name="saveShippingInfo" onChange={ handleShippingInfo } checked={ customer.shippingInformation.saveShippingInfo } />
               <label htmlFor="saveShippingInfo" className='text-base ml-2'>
                  Save my information for next time
               </label>
            </span>
         </div>
         <div className='flex items-center justify-between'>
            <span className='font-bold text-lg text-[#BDA25C]'>Return to home</span>
            <div className="relative">
               <button className='bg-[#BDA25C] py-3 px-9 rounded-[4px] text-white font-bold text-lg'
                  onClick={ () => {
                     const { status, invalid } = validateCustomerInfo()
                     setInvalidInputs(invalid)
                     status && dispatch(setCheckoutStage({ stage: "shipping" }))
                     status && dispatch(setAsRegistered())
                     !status && setInvalidErrortDisplay(true)
                  } }>Continue to shipping</button>
               { invalidErrortDisplay &&
                  <span className="text-red-500 text-sm font-semibold absolute top-[-28px] left-2">Please fill in the missing information.</span> }
            </div>
         </div>
      </div>
   )
}

export default Customer