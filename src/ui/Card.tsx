'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaStar, FaBoxOpen } from 'react-icons/fa'
import { Product } from '@/lib/types'
import Button from './Button'

export default function Card({ product }: { product: Product }) {
  const router = useRouter()
  const inStock = product.stock > 0

  const goDetails = () => {
    router.push(`/details/${product._id}`)
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/90 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-purple-500/20">

      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-tr from-indigo-50 to-purple-50">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-purple-300">
            <FaBoxOpen className="text-5xl" />
          </div>
        )}

        {/* Category badge */}
        <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-lg bg-white/90 px-2.5 py-1 text-xs font-semibold text-indigo-600 shadow-sm ring-1 ring-inset ring-indigo-500/10 backdrop-blur">
          {product.category}
        </span>

        {/* Rating badge */}
        {product.rating && (
          <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-amber-700 shadow-sm ring-1 ring-inset ring-amber-500/20 backdrop-blur">
            <FaStar className="text-amber-400" />
            {product.rating}
          </span>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/50">
            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-rose-600">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h2 className="line-clamp-2 min-h-[3.5rem] text-lg font-semibold leading-snug text-gray-900 transition-colors group-hover:text-purple-600">
            {product.name}
          </h2>

          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium ${
              inStock ? 'text-emerald-600' : 'text-rose-500'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {inStock ? `${product.stock} in stock` : 'Currently unavailable'}
          </span>
        </div>

        {/* Price + action */}
        <div className="mt-auto space-y-4 border-t border-gray-100 pt-4">
          <div>
            <span className="block text-xs font-medium text-gray-400">Price</span>
            <p className="text-2xl font-extrabold text-gray-900">${product.price}</p>
          </div>

          <Button onClick={goDetails} type="button" variant="primary">
            Details
          </Button>
        </div>
      </div>
    </div>
  )
}