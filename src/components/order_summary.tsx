import type { CartItem, ListResult } from 'swell-js';

import { getPrice } from '@/utils/product';

import OrderSummaryItem from './order_summary_item';

export default function OrderSummary({
  items,
  discount_total,
  sub_total,
  grand_total,
  tax_total,
  promotions,
}: {
  items: Array<CartItem>;
  discount_total: number;
  total: number;
  sub_total: number;
  tax_total: number;
  promotions: ListResult<any>;
  grand_total: number;
}) {
  return (
    <div className="lg:py-21 relative col-span-full flex flex-col bg-gray-100 py-6 pl-8 pr-4 sm:py-12  lg:col-span-5">
      <h2 className="text-black">Order summary</h2>

      <div className="relative max-w-md">
        <ul className="space-y-5">
          {items.map((e: any, key) => (
            <OrderSummaryItem key={key} {...e} />
          ))}
        </ul>
        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
        <div className="space-y-2">
          <hr />
          <div className="flex gap-2">
            <input
              type="text"
              name="mail"
              className=" h-9 w-full rounded border px-2 text-xs placeholder:text-zinc-500 focus:border-gray-500 focus:outline-none"
              placeholder="Coupon code"
            />
            <button
              type="button"
              className=" rounded bg-zinc-700 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-zinc-900"
            >
              Apply
            </button>
          </div>
          <hr className="pb-2" />
        </div>
        <div className="space-y-2">
          <p className="flex justify-between text-sm  text-black">
            <span>Subtotal</span>
            <span>{getPrice(sub_total, 'AUD')}</span>
          </p>
          <p className="flex justify-between text-sm  text-black">
            <span>Shipping</span>
            <span className="text-xs font-light">—</span>
          </p>
          <p className="flex justify-between text-sm  text-black">
            <span>Discount</span>
            <span>({getPrice(discount_total, 'AUD')})</span>
          </p>
          <hr />

          {promotions.count > 0 &&
            promotions.results.length > 0 &&
            promotions.results.map((promotion) => (
              <div
                key={promotion.id}
                className="relative inline-flex  rounded-md bg-gray-200 p-2 text-sm text-black"
              >
                <span className="text-xs">{promotion.name}</span>
                {/* <span className="text-xs"></span> */}
              </div>
            ))}
          <hr />
          <div className="flex items-center justify-between text-lg font-bold text-black">
            <div>
              Total
              <span className="block text-xs font-light">
                including {getPrice(tax_total, 'AUD')} in taxes
              </span>
            </div>
            <span>{getPrice(grand_total, 'AUD')}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-10 text-black">
        <h3 className="mb-5 text-lg font-bold">Support</h3>
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
      <div className="relative mt-10 flex">
        <p className="flex flex-col">
          <span className="text-sm font-bold text-black">
            Money Back Guarantee
          </span>
          <span className="text-xs font-medium text-black">
            within 30 days of purchase
          </span>
        </p>
      </div>
    </div>
  );
}
