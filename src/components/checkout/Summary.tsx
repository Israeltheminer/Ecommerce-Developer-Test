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
 * @returns {JSX.Element} The component to be rendered.
 */
const Summary = ({ stage }: any) => {
   const dispatch = useDispatch()
   const [currency, setCurrency] = useState("USD")
   const [currencySwitchBoxDisplay, setCurrencySwitchBoxDisplay] = useState(false)
   const handleCurrencySwitch = (name: string) => {
      setCurrency(() => name)
      setCurrencySwitchBoxDisplay(() => false)
   }
   const { tax_total, sub_total, item_discount, shipment_total, grand_total, item_quantity, items } = useSelector((state: RootState) => state.order)
   const [price, setPrice] = useState({
      tax_total: "US$0.00", sub_total: "US$0.00", item_discount: "US$0.00", shipment_total: "US$0.00", grand_total: "US$0.00"
   })
   const [summary, setSummary] = useState({
      item_quantity: 0,
      items: [],
      stage: "customer"
   })

   useEffect(() => {
      async function selectCurrency () {
         const currency = swell.currency.selected()
         setCurrency(() => currency)
      }
      selectCurrency()
      setPrice(() => ({ tax_total: getPrice(tax_total, currency), sub_total: getPrice(sub_total, currency), item_discount: getPrice(item_discount, currency), shipment_total: getPrice(shipment_total, currency), grand_total: getPrice(grand_total, currency) }))
      setSummary(() => ({ item_quantity, items, stage }))
   }, [tax_total, sub_total, item_discount, shipment_total, grand_total, item_quantity, items])
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
   return (<>
      <div className='w-[330px] grid-cols-1 divide-y divide-[#262523] overflow-hidden' data-cy="Summary">
         <div>
            <h1 className='font-bold mb-2 text-xl'>Order Summary</h1>
            <div>
               { summary.items?.map((e: any, key: number) => (
                  <OrderSummaryItem key={ `${key}` } { ...e } stage={ stage } currency={ currency } totalItems={ items.length } itemIndex={ key } />
               )) }
            </div>
         </div>
         {
            summary.stage !== "thanks" &&
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
         <div className='py-7 flex justify-between items-center w-full'>
            <span>
               <p className='text-lg font-bold'>Total</p>
               <p className='text-sm'>{ `Including ${price.tax_total === "$0.00" ? "US$0.00" : price.tax_total} in taxes` }</p>
            </span>
            <span className='flex justify-between items-center relative gap-4'>
               {
                  summary.stage !== "thanks" &&
                  <p className='text-base opacity-80 hover:border-gray-400 hover:border border hover:font-semibold cursor-pointer rounded-lg py-2 px-5' onClick={ () => {
                     setCurrencySwitchBoxDisplay((prev) => !prev)
                  } }>{ currency }</p>
               }
               { (currencySwitchBoxDisplay && summary.stage !== "thanks") &&
                  <ul className='bg-white absolute left-0 top-[30px] divide-y rounded-lg'>
                     { currency !== "USD" && <li className='px-6 py-2 text-base font-semibold cursor-pointer hover:bg-gray-200' onClick={ () => handleCurrencySwitch("USD") }>USD</li> }
                     { currency !== "AUD" && <li className='px-6 py-2 text-base font-semibold cursor-pointer hover:bg-gray-200' onClick={ () => handleCurrencySwitch("AUD") }>AUD</li> }
                     { currency !== "EUR" && <li className='px-6 py-2 text-base font-semibold cursor-pointer hover:bg-gray-200' onClick={ () => handleCurrencySwitch("EUR") }>EUR</li> }
                  </ul>
               }
               <p className='text-xl font-bold'>{ price.grand_total === "$0.00" ? "US$0.00" : price.grand_total }</p>
            </span>
         </div>
         { summary.stage === "thanks" && <>

            <div className="relative  text-black">
               <h3 className="my-5 text-lg font-bold">Support</h3>
               <p className="text-sm font-semibold">
                  +01 234 456 789 <span className="font-light">(International)</span>
               </p>
               <p className="mt-1 text-sm font-semibold">
                  support@example.com <span className="font-light">(Email)</span>
               </p>
               <p className="mt-2 text-xs font-medium">
                  Call us now for payment related issues
               </p>
            </div>
            <div className="relative mt-5 flex">
               <p className="flex flex-col my-5">
                  <span className="text-sm font-bold text-black">
                     Money Back Guarantee
                  </span>
                  <span className="text-xs font-medium text-black">
                     within 30 days of purchase
                  </span>
               </p>
            </div>
         </>
         }
      </div>
   </>
   )
}

export default Summary