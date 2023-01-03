import { RootState } from '@/store/reducers'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import swell from "swell-js"

swell.init(
   process.env.NEXT_PUBLIC_SWELL_STORE as string,
   process.env.NEXT_PUBLIC_SWELL_API_TOKEN as string
)

const Thanks = ({ checkout_id }: { checkout_id: string }) => {
   const { orders } = useSelector((state: RootState) => state.shipping)
   const { shippingInformation } = useSelector((state: RootState) => state.customer)
   const { email, billing } = useSelector((state: RootState) => state.account)
   useEffect(() => {
      async function getOrders () {
         const orders = await swell.account.getOrder()
      }
      getOrders()
   }, [])

   return (
      <div className='flex flex-col gap-10' data-cy="Thanks">
         <div className='flex items-center justify-between'>
            <div className='flex gap-4 items-center'>
               <div className='bg-[#BDA25C] rounded-full w-6 h-6 z-30 flex items-center justify-center'>
                  <Image src="/assets/images/mark.svg" alt="mark" width={ 16 } height={ 16 } />
               </div>
               <span>
                  Order #{ }
               </span>
            </div>
            <p>

            </p>
         </div>
         <div>
            <h1 className='font-semibold leading-loose text-[26px]'>Thank you for your purchase</h1>
            <p className='text-base'>Your order is confirmed and we'll notify you when its shipped</p>
         </div>
         <div className='border rounded-sm border-[#ced4da] py-5 px-6'>
            <h2 className='text-lg mb-4'>Customer information</h2>
            <div className='flex flex-col text-sm gap-5'>
               <div className='flex flex-wrap justify-between items-start'>
                  <div className='w-[220px]'>
                     <h3 className='mb-2 font-bold'>Shipping address</h3>
                     <p>{ shippingInformation?.apartment } { shippingInformation?.address } { shippingInformation?.city } { shippingInformation?.province } { shippingInformation?.country }</p>
                     <p>{ shippingInformation?.phonenumber }</p>
                  </div>
                  <div className='w-[220px]'>
                     <h3 className='mb-2 font-bold'>Billing address</h3>
                     <p>{ billing?.apartment } { billing?.address1 } { billing?.city } { billing?.province } { billing?.country }</p>
                     <p>{ billing?.phonenumber }</p>
                  </div>
               </div>
               <div className='flex flex-wrap justify-between items-start'>
                  <div className='w-[220px]'>
                     <h3 className='mb-2 font-bold'>Shipping method</h3>
                     <ul style={ { margin: 0, marginLeft: "22px" } } className="list-disc">
                        { orders.map(({ shipping }, key) => (
                           <li key={ key } className="capitalize">
                              { shipping } Shipping
                           </li>
                        )) }
                     </ul>
                  </div>
                  <div className='w-[220px]'>
                     <h3 className='mb-2 font-bold'>Email address</h3>
                     <p>{ email }</p>
                  </div>
               </div>
               <div className='flex flex-wrap justify-between items-start'>
                  <div className='w-[220px]'>
                     <h3 className='mb-2 font-bold'>Payment method</h3>
                  </div>
               </div>
            </div>
         </div>
         <div className='flex items-center justify-between'>
            <div className='font-bold text-base flex items-center gap-4'>
               <p>Neep help?</p>
               <p className='text-[#BDA25C]'>Contact us</p>
            </div>
            <button className='bg-[#BDA25C] min-w-[260px] py-[10px] px-9 rounded-sm text-white font-bold text-base'>Continue shopping</button>
         </div>
      </div>
   )
}

export default Thanks
