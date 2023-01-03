import { RootState } from '@/store/reducers'
import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import swell from "swell-js"
import { getCart } from "@/services/orderService"
import OrderSummaryItem from '../order_summary_item'
import { getPrice } from '@/utils/product'

swell.init(
   process.env.NEXT_PUBLIC_SWELL_STORE as string,
   process.env.NEXT_PUBLIC_SWELL_API_TOKEN as string
)
/**
 * Displays a summary of the items in the user's cart, including the total cost and any applied discounts.
 * Only visible on mobile device or smaller screens
 * @returns {JSX.Element} The component to be rendered.
 */
const MobileSummary = ({ stage }: any) => {
   const dispatch = useDispatch()
   const [currency, setCurrency] = useState("USD")
   const [currencySwitchBoxDisplay, setCurrencySwitchBoxDisplay] = useState(false)
   const [summaryDisplay, setSummaryDisplay] = useState(false)
   const [currentStage, setCurrentStage] = useState("shipping")
   const handleCurrencySwitch = (name: string) => {
      setCurrency(() => name)
      setCurrencySwitchBoxDisplay(() => false)
   }
   const { tax_total, sub_total, item_discount, shipment_total, grand_total, item_quantity, items } = useSelector((state: RootState) => state.order)
   const [price, setPrice] = useState({
      tax_total: "US$0.00", sub_total: "US$0.00", item_discount: "US$0.00", shipment_total: "US$0.00", grand_total: "US$0.00", item_quantity: 0
   })
   useEffect(() => {
      async function selectCurrency () {
         const currency = swell.currency.selected()
         setCurrency(() => currency)
      }
      selectCurrency()
      setPrice(() => ({
         tax_total: getPrice(tax_total, currency),
         sub_total: getPrice(sub_total, currency),
         item_discount: getPrice(item_discount, currency),
         shipment_total: getPrice(shipment_total, currency),
         grand_total: getPrice(grand_total, currency),
         item_quantity
      }))
   }, [tax_total, sub_total, item_discount, shipment_total, grand_total])
   useEffect(() => {
      async function refreshData () {
         try {
            await swell.currency.select(currency)
            await dispatch(getCart())
         } catch (error: any) {
            console.error(error)
         }
      }
      refreshData()
   }, [currency])
   useEffect(() => {
      setCurrentStage(() => stage)
   }, [])
   return (<>
      <div className='border rounded-sm w-full mb-3 px-4 py-2 flex lg:hidden justify-between items-center' data-cy="MobileSummary">
         <span className='text-sm text-[#BDA25C] font-medium flex items-center gap-2'>
            <p>Order Summary ({ price.item_quantity } { price.item_quantity > 1 ? "items" : "item" })</p>
            <svg viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 512 512" className={ `h-5 w-5 cursor-pointer transition-all ease-in-out ${summaryDisplay ? ' rotated' : ''}` } onClick={ () => setSummaryDisplay((prev) => !prev) }><path d="m256 298.3 174.2-167.2c4.3-4.2 11.4-4.1 15.8.2l30.6 29.9c4.4 4.3 4.5 11.3.2 15.5L264.1 380.9c-2.2 2.2-5.2 3.2-8.1 3-3 .1-5.9-.9-8.1-3L35.2 176.7c-4.3-4.2-4.2-11.2.2-15.5L66 131.3c4.4-4.3 11.5-4.4 15.8-.2L256 298.3z" fill="#bda25c" className="fill-000000"></path></svg>
         </span>
         <span className='flex justify-between items-center relative gap-4'>
            {
               currentStage !== "thanks" &&
               <p className='text-sm opacity-80 hover:border-gray-400 hover:border border hover:font-semibold cursor-pointer rounded-lg py-2 px-5' onClick={ () => {
                  setCurrencySwitchBoxDisplay((prev) => !prev)
               } }>{ currency }</p>
            }
            { (currencySwitchBoxDisplay && currentStage !== "thanks") &&
               <ul className='bg-white absolute left-0 top-[30px] divide-y rounded-lg border'>
                  { currency !== "USD" && <li className='px-6 py-2 text-sm font-semibold cursor-pointer hover:bg-gray-200' onClick={ () => handleCurrencySwitch("USD") }>USD</li> }
                  { currency !== "AUD" && <li className='px-6 py-2 text-sm font-semibold cursor-pointer hover:bg-gray-200' onClick={ () => handleCurrencySwitch("AUD") }>AUD</li> }
                  { currency !== "EUR" && <li className='px-6 py-2 text-sm font-semibold cursor-pointer hover:bg-gray-200' onClick={ () => handleCurrencySwitch("EUR") }>EUR</li> }
               </ul>
            }
            <p className='md:text-xl text-base'>{ price.grand_total === "$0.00" ? "US$0.00" : price.grand_total }</p>
         </span>
      </div>
      {
         summaryDisplay &&

         <div className='w-[330px] grid-cols-1 divide-y divide-[#262523] overflow-hidden' >
            <div>
               <div className="">
                  { items?.map((e: any, key: string) => (
                     <OrderSummaryItem key={ key } { ...e } stage={ stage } currency={ currency } totalItems={ items.length } itemIndex={ key } />
                  )) }
               </div>
            </div>
            {
               stage !== "thanks" &&
               <div className='py-7 flex items-center justify-between'>
                  <input className='base-input' type="text" name="discount" placeholder='Gift Cards / Discount Code' />
                  <button className='bg-[#BDA25C] py-[10px] px-7 rounded-[4px] text-white text-lg'>Apply</button>
               </div>
            }
            <div className='py-7 flex flex-col gap-5'>
               <span className='flex justify-between items-center w-full text-base'>
                  <p>Discount</p>
                  <p className='font-semibold text-base'>{ price.item_discount === "$0.00" ? "US$0.00" : price.item_discount }</p>
               </span>
               <span className='flex justify-between items-center w-full text-base'>
                  <p>Sub total</p>
                  <p className='font-semibold text-base'>{ price.sub_total === "$0.00" ? "US$0.00" : price.sub_total }</p>
               </span>
               <span className='flex justify-between items-center w-full text-base'>
                  <p>Shipping</p>
                  <p className='font-semibold text-base'>{ price.shipment_total === "$0.00" ? "US$0.00" : price.shipment_total }</p>
               </span>
            </div>
         </div>
      }
   </>
   )
}

export default MobileSummary