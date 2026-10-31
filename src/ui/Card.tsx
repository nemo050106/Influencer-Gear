'use client'
import { Product } from '@/lib/types'
import { FaStar } from 'react-icons/fa'
import Button from './Button'
import { useRouter } from 'next/navigation'

export default function Card({ product }: { product: Product }) {
  const router = useRouter()
  const inStock = product.stock > 0
 const goDetails = () => {
  router.push(`/details/${product._id}`)
}

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-purple-500/20 backdrop-blur-sm">
      <div>
        {/* Top Header: Category Badge & Stock Indicator */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
            {product.category}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${inStock ? 'text-emerald-600' : 'text-rose-500'
              }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
            />
            {inStock ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Product Name */}
        <h2 className="mt-4 text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
          {product.name}
        </h2>
      </div>

      {/* Footer: Price & Rating */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <span className="text-xs text-gray-400 block font-medium">Price</span>
          <p className="text-xl font-bold text-gray-900">${product.price}</p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-500/20">
          <FaStar className="text-amber-400" />
          <span>{product.rating}</span>
        </div>


      </div>


      <Button onClick={goDetails} type='button' variant='primary'>Details</Button>
    </div>
  )
}