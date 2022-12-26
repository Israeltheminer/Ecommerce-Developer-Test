import { useEffect, useState } from 'react';
import type { Cart } from 'swell-js';
import swell from 'swell-js';

import CheckoutForm from '@/components/form';
import Loader from '@/components/loading';
import OrderSummary from '@/components/order_summary';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = ({ checkout_id }: { checkout_id: string }) => {
  swell.init(
    process.env.NEXT_SWELL_PUBLIC_STORE as string,
    process.env.NEXT_SWELL_PUBLIC_API_TOKEN as string
  );

  // Initialize the client first

  const [loading, setLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<Cart | any>(null);
  useEffect(() => {
    setLoading(true);
    // @ts-ignore
    swell.cart.recover(checkout_id).then((e: any) => {
      setCart({ ...e });
    });
    setLoading(false);
  }, []);

  return (
    <Main
      meta={
        <Meta
          title="Next.js checkout Presentation"
          description="Next js checkout is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      {loading && (
        <div
          id="loading-screen"
          className="fixed top-0 left-0 z-50 block  h-full w-full bg-white"
        >
          <span className="relative top-1/2 my-0 mx-auto block h-0 w-0  opacity-75">
            <Loader />
          </span>
        </div>
      )}

      <div className="relative bg-white">
        <div className="mx-auto grid min-h-screen grid-cols-12">
          <div className="mx-auto mr-6  py-6 sm:py-12 lg:col-span-3 lg:col-start-4">
            <div className="ml-auto w-full">
              <h1 className="relative text-center text-2xl font-medium text-gray-700 sm:text-3xl">
                Londinium
              </h1>
              <div className="flex flex-wrap items-center justify-center text-xs">
                <ul className="flex items-center gap-2">
                  <li className="inline-flex items-center">
                    <a href="#" className="text-gray-900 hover:text-gray-900">
                      Customer Information
                    </a>
                    <span className="ml-2 h-auto font-medium text-gray-400">
                      /
                    </span>
                  </li>

                  <li className="inline-flex items-center">
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Shipping Method
                    </a>

                    <span className="ml-2 h-auto font-medium text-gray-400">
                      /
                    </span>
                  </li>

                  <li className="inline-flex items-center">
                    <a href="#" className=" text-gray-600 hover:text-gray-900">
                      Payment Method
                    </a>
                  </li>
                </ul>
              </div>

              <CheckoutForm />
            </div>
          </div>
          {cart !== null && <OrderSummary {...cart} />}
        </div>
      </div>
    </Main>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      checkout_id: context.query.slug,
    },
  };
}

export default Index;
