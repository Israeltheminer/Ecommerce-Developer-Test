import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import Image from 'next/image'
import CheckoutStatusBar from "@/components/checkout/StatusBar"
import Customer from "@/components/checkout/Customer"
import Shipping from "@/components/checkout/Shipping"
import Payment from "@/components/checkout/Payment"
import Summary from "@/components/checkout/Summary"
import MobileSummary from "@/components/checkout/MobileSummary"
import Thanks from "@/components/checkout/Thanks"
import { useSelector } from "react-redux"
import { RootState } from '@/store/reducers'

/**
 * A component that displays the checkout process for an online store.
 * @returns {JSX.Element} The rendered checkout process.
 */
const Checkout = ({ checkout_id }: any) => {

   /**
   * The current stage of the checkout process.
   * @type {"customer" | "shipping" | "payment" | "thanks"}
   */
   const stage = useSelector((state: RootState) => state.checkout.stage)

   return (
      <Main meta={ <Meta title="The Hardware Store | Checkout" description="Checkout page" /> }>
         <div className="flex">
            <div className='bg-white py-16 px-[7.5%] flex flex-col items-stretch mb-auto grow '>
               <div className='mx-auto mb-16'>
                  <Image src="/assets/images/logo.svg" width={ 400 } height={ 300 } alt="logo" />
               </div>
               <div className=''>
                  <div className="progress">
                     <CheckoutStatusBar stage={ stage } />
                  </div>
                  <div className='flex flex-col items-center lg:hidden'>
                     <MobileSummary stage={ stage } mobile={ true } />
                  </div>
                  {
                     stage === "customer" ? <Customer checkout_id={ checkout_id } /> : stage === "shipping" ? <Shipping /> : stage === "payment" ? <Payment /> : stage === "thanks" && <Thanks checkout_id={ checkout_id } />
                  }
               </div>
            </div>
            <div className='bg-[#f0e9e2] py-16 px-[6%] max-w-600px hidden lg:block overflow-hidden'>
               <Summary stage={ stage } mobile={ false } />
            </div>
         </div>
      </Main>
   )
}

export default Checkout

export async function getServerSideProps (context: any) {
   return {
      props: {
         checkout_id: context.query.slug,
      }
   }
}