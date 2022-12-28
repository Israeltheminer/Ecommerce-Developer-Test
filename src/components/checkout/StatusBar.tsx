import Image from 'next/image'

/**
 * Denotes the current stage of checkout.
 */
const Current = ({ name, position }: { name: string; position: string }) => {
   return (
      <div className="flex flex-col" style={ { alignItems: position } }>
         <div className="w-5 h-5 border z-30 border-[#26252388] rounded-full bg-white flex items-center justify-center">
            <div className="h-[8px] w-[8px] bg-black rounded-full"></div>
         </div>
         <div className="text-base font-medium text-gray-700 relative" style={ { right: position === "start" ? "30%" : "auto", left: position === "end" ? "30%" : "auto" } }>{ name }</div>
      </div>
   )
}

/**
 * Component validates a checkout stage as completed.
 */
const Processed = ({ name, position }: { name: string; position: string }) => {
   return (
      <div className="flex flex-col" style={ { alignItems: position } }>
         <div className="w-5 h-5 z-30 bg-[#262523] rounded-full flex items-center justify-center">
            <Image src="/assets/images/mark.svg" width={ 12 } height={ 12 } alt="mark" />
         </div>
         <div className="text-base font-medium text-gray-700 relative" style={ { right: position === "start" ? "30%" : "auto", left: position === "end" ? "30%" : "auto" } }>{ name }</div>
      </div>
   )
}

/**
 * Component validates a checkout stage as uncompleted.
 */
const Unprocessed = ({ name, position }: { name: string; position: string }) => {
   return (
      <div className="flex flex-col" style={ { alignItems: position } }>
         <div className="w-5 h-5 border z-30 border-gray-200 rounded-full bg-white flex items-center justify-center">
         </div>
         <div className="text-base font-medium text-gray-200 relative" style={ { right: position === "start" ? "30%" : "0", left: position === "end" ? "30%" : "0" } }>{ name }</div>
      </div>

   )
}

/**
 * A component that displays the current stage of the checkout process.
 */
function CheckoutStatusBar ({ stage }: { stage: string }) {
   return (
      <div className="py-2">
         <div className="container mx-auto px-10">
            <div className="flex justify-between items-center">
               { stage === "customer" && (
                  <>
                     <Current name={ "Customer" } position={ "start" } />
                     <Unprocessed name={ "Shipping" } position={ "center" } />
                     <Unprocessed name={ "Payment" } position={ "end" } />
                  </>
               ) }
               { stage === "shipping" &&
                  <>
                     <Processed name={ "Customer" } position={ "start" } />
                     <Current name={ "Shipping" } position={ "center" } />
                     <Unprocessed name={ "Payment" } position={ "end" } />
                  </>
               }
               { stage === "payment" &&
                  <>
                     <Processed name={ "Customer" } position={ "start" } />
                     <Processed name={ "Shipping" } position={ "center" } />
                     <Current name={ "Payment" } position={ "end" } />
                  </>
               }
            </div>
            <div className="my-2 h-[2px] rounded-full bg-gray-200 w-full relative bottom-[42px]">
               <div
                  className="h-[2px] rounded-full bg-[#262523]" style={ { width: stage === "customer" ? "0" : stage === "shipping" ? "50%" : stage === "payment" ? "100%" : "0", transition: 'width 0.5s ease-in-out' } }
               />
            </div>
         </div>
      </div>
   )
}

export default CheckoutStatusBar
export { Current, Processed }