import Image from 'next/image'

/**
 * Displays a summary of the items in the user's cart, including the total cost and any applied discounts.
 * @returns {JSX.Element} The component to be rendered.
 */
const Summary = ({ stage }: { stage: string }) => {
   return (
      <div className='w-[330px] grid grid-cols-1 divide-y divide-[#262523]'>
         <div>
            <h1 className='font-bold mb-2 text-xl'>Order Summary</h1>
            <div className='flex flex-col gap-7 py-8'>
               {
                  stage !== "customer" &&
                  <div className='flex justify-between'>
                     <span className='text-lg font-bold'>Delivery 1 of 2</span>
                     <span className='text-base'>Standard Shipping</span>
                  </div>
               }
               <div className='flex items-center justify-between'>
                  <div className='flex gap-6 items-center'>
                     <div className='relative'>
                        <span className='rounded-full p-1 text-sm w-6 h-6 bg-[#BDA25C] text-white absolute top-[-12px] right-[-12px] flex justify-center items-center'>1</span>
                        <Image src="/assets/images/londinium.png" width={ 70 } height={ 70 } alt="product" />
                     </div>
                     <p className='font-bold text-base'>WOODEN MA R21</p>
                  </div>
                  <span className='font-bold text-base'>$35.00</span>
               </div>
            </div>
         </div>
         <div className='py-7 flex items-center justify-between'>
            <input className='base-input' type="text" name="discount" placeholder='Gift Cards / Discount Code' />
            <button className='bg-[#BDA25C] py-[10px] px-7 rounded-[4px] text-white text-lg'>Apply</button>
         </div>
         <div className='py-7 flex flex-col gap-5'>
            <span className='flex justify-between items-center w-full text-lg'>
               <p>Discount</p>
               <p>$0</p>
            </span>
            <span className='flex justify-between items-center w-full text-lg'>
               <p>Sub total</p>
               <p>$0</p>
            </span>
            <span className='flex justify-between items-center w-full text-lg'>
               <p>Shipping</p>
               <p>-</p>
            </span>
         </div>
         <div className='py-7 flex justify-between items-center w-full'>
            <span>
               <p className='text-lg font-bold'>Total</p>
               <p className='text-sm'>Including $25.02 in taxes</p>
            </span>
            <span className='flex justify-between items-center gap-4'>
               <p className='text-base opacity-80'>AUD</p>
               <p className='text-xl font-bold'>$35.00</p>
            </span>
         </div>
      </div>
   )
}

export default Summary