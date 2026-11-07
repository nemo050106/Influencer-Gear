import Link from 'next/link'
import { FaArrowRight, FaBoxOpen } from 'react-icons/fa'
import { getPaginatedProducts } from '@/lib/getProducts'
import Card from '@/ui/Card'

type Props = {
  title?: string
  limit?: number
}

export default async function FeatureProducts({ title = 'Top rated gear', limit = 8 }: Props) {
  let products: Awaited<ReturnType<typeof getPaginatedProducts>>['products'] = []

  try {
    // Page 1 with `limit` items. Wrapped in try/catch so a failing API
    // hides this section instead of breaking the whole page.
    const data = await getPaginatedProducts(1, limit)
    products = data.products
  } catch (err) {
    console.error('FeatureProducts failed:', err)
  }

  return (
    <section className="space-y-6 max-w-[1600px] mx-auto px-5 py-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-indigo-950 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">Hand-picked favourites from our catalog.</p>
        </div>

        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-purple-600 transition hover:text-purple-500"
        >
          View all <FaArrowRight className="text-xs" />
        </Link>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card product={product} key={product._id} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white/80 py-14 text-center shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl text-purple-300">
            <FaBoxOpen />
          </div>
          <p className="text-sm font-semibold text-indigo-950">No featured products right now</p>
        </div>
      )}
    </section>
  )
}