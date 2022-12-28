import { useDispatch, useSelector } from "react-redux"
import { RootState } from '@/store/reducers'
import { setCheckoutStage } from "@/store/reducers/checkoutSlice"
import { setEmail, setInstructions } from "@/store/reducers/shippingSlice"
import { changeShipping } from "@/store/reducers/orderSlice"
import { Current } from "@/components/checkout/StatusBar"
import { useEffect } from "react"
import CustomerInfo from "./CustomerInfo"

const Shipping = () => {
   const dispatch = useDispatch()
   const { contactInformation } = useSelector((state: RootState) => state.customer)
   const { instructions } = useSelector((state: RootState) => state.shipping)
   const { orders } = useSelector((state: RootState) => state.order)

   useEffect(() => {
      dispatch(setEmail(contactInformation.email))
   }, [])
   return (
      <div className='flex flex-col gap-10'>
         <CustomerInfo />
         <div className="flex flex-col gap-6">
            <div className='flex gap-4 items-center'>
               <div className="scale-125">
                  <Current name="" position="" />
               </div>
               <h1 className='font-bold text-xl text-[#262523]'>Select shipping details & dates</h1>
            </div>
            <div className="flex flex-col gap-8">
               {/* To fix the type error from dissallowing the sort method, the array is first freezed, sliced and finally sorted */ }
               { (Object.freeze(orders).slice().sort((a, b) => parseInt(b.id) - parseFloat(a.id))).map((order, index) => (
                  <div className="flex flex-col gap-5" key={ `${order.id}` }>

                     <h1 className="text-[#BDA25C] text-xl font-bold ">Delivery { index + 1 } of 2</h1>
                     <span className="relative py-2 max-w-[125px] px-6 border border-[#BDA25C] rounded-sm text-[#BDA25C] font-bold text-lg text-center">
                        <span className='rounded-full p-1 text-sm w-6 h-6 bg-[#BDA25C] text-white absolute top-[-12px] right-[-12px] flex justify-center items-center'>1</span>Item { index + 1 }</span>
                     <div className="w-full text-base flex flex-col gap-2 font-semibold">
                        <span className="rounded-sm py-4 px-5 flex items-center justify-between bg-[#BDA25c] text-white">
                           <div className="flex items-center gap-6">
                              <div>
                                 <input type="radio" name={ `${order.id}-radio` } id="" className="gold-radio-input" value="standard" checked={ order.shipping === "standard" } onChange={ () => dispatch(changeShipping({ shipping: "standard", order })) } />
                              </div>
                              <span>Standard Shipping</span>
                           </div>
                           <span>Free</span>
                        </span>
                        <span className="rounded-sm py-4 px-5 flex border border-gray-200 items-center justify-between" style={ { backgroundColor: "#f0e9e2" } }>
                           <div className="flex items-center gap-6">
                              <div>
                                 <input type="radio" name={ `${order.id}-radio` } id="" className="gold-radio-input" value="express" checked={ order.shipping === "express" } onChange={ () => dispatch(changeShipping({ shipping: "express", order })) } />
                              </div>
                              <span>Express Shipping</span>
                           </div>
                           <span>Free</span>
                        </span>
                     </div>
                  </div>
               )) }
            </div>
            <div className="flex flex-col gap-4">
               <p className="text-sm">Please provide delivery instructions (if any)</p>
               <input type="text" className="base-input" placeholder="Instructions (optional)" name="deliveryInstructions" value={ instructions } onChange={ e => dispatch(setInstructions(e.target.value)) } />
            </div>
         </div>
         <div className='flex items-center justify-between'>
            <span className='font-bold text-lg text-[#BDA25C] cursor-pointer' onClick={ () => {
               dispatch(setCheckoutStage({ stage: "customer" }))
            } }>Back</span>
            <button className='bg-[#BDA25C] py-3 px-9 rounded-sm text-white font-bold text-lg'
               onClick={ () => {
                  dispatch(setCheckoutStage({ stage: "payment" }))
               } }>Continue to payment</button>
         </div>
      </div>
   )
}

export default Shipping