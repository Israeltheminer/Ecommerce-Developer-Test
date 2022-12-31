import type { Product, ProductVariant } from 'swell-js'

import { getPrice } from '@/utils/product'
import { useEffect, useState } from 'react'

export default function OrderSummaryItem ({ product, price, variant, quantity, stage, currency, totalItems, itemIndex }: {
  item: object
  product: Product
  variant: ProductVariant
  price: number
  quantity: number
  stage: string
  currency: string
  totalItems: number
  itemIndex: string
}) {
  const [parsedPrice, setParsedPrice] = useState(getPrice(price, currency))
  useEffect(() => {
    setParsedPrice(() => getPrice(price, currency))
  }, [price])

  return (
    <div className='flex flex-col gap-3 py-8'>
      <div className='flex justify-between overflow-y-hidden mb-3' style={ { height: stage !== "customer" ? "auto" : "0" } }>
        <span className='text-lg font-bold'>Delivery { itemIndex + 1 } of { totalItems }</span>
        <span className='text-base'>Standard Shipping</span>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-6 items-center'>
          <div className='relative'>
            <span className='rounded-full p-1 text-sm w-6 h-6 bg-[#BDA25C] text-white absolute top-[-12px] right-[-12px] flex justify-center items-center'>{ quantity }</span>
            <img
              src={
                (product.images && product.images[0]?.file?.url) ??
                'https://londiniumespresso.com/store/image/cache/catalog/all-machines/londinium-R24-2021-800x800.jpg'
              }
              alt=""
              className="max-h-16 rounded-md"
            />
          </div>
          <div className="ml-3">
            <p className="text-base font-semibold text-black">{ product.name }</p>
            { variant?.name && (
              <p className="text-sm font-medium text-black text-opacity-80">
                { variant.name }
              </p>
            ) }
          </div>
        </div>
        <span className='font-bold text-base'>{ parsedPrice }</span>
      </div>
    </div>
  )
}
