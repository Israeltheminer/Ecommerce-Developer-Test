import type { Product, ProductVariant } from 'swell-js';

import { getPrice } from '@/utils/product';

export default function OrderSummaryItem({
  product,
  price,
  variant,
}: {
  item: object;
  product: Product;
  variant: ProductVariant;
  price: number;
}) {
  return (
    <li className="flex items-center justify-between">
      <div className="inline-flex items-center">
        <img
          src={
            (product.images && product.images[0]?.file?.url) ??
            'https://londiniumespresso.com/store/image/cache/catalog/all-machines/londinium-R24-2021-800x800.jpg'
          }
          alt=""
          className="max-h-16 rounded-md"
        />
        <div className="ml-3">
          <p className="text-base font-semibold text-black">{product.name}</p>
          {variant?.name && (
            <p className="text-sm font-medium text-black text-opacity-80">
              {variant.name}
            </p>
          )}
        </div>
      </div>
      <p className="text-sm font-semibold text-black">
        {getPrice(price, 'AUD')}
      </p>
    </li>
  );
}
