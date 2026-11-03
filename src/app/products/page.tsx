import React from 'react'
import { FaShippingFast, FaShieldAlt, FaStar } from 'react-icons/fa'
import { getPaginatedProducts } from '@/lib/getProducts'
import ProductsBrowser from '@/components/ProductsBrowser'

const perks = [
  { icon: FaShippingFast, title: 'Fast shipping', text: 'Orders are processed quickly' },
  { icon: FaShieldAlt, title: 'Quality gear', text: 'Curated for modern creators' },
  { icon: FaStar, title: 'Top rated', text: 'Reviewed and rated products' },
]

export default async function Products() {
  // Load the whole catalog once. The search and paging then run in the browser.
  const { products } = await getPaginatedProducts(1, 1000)

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-gray-100/60 to-slate-200/50 px-4 py-12 sm:px-6 lg:px-8">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-7xl space-y-10">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-600 px-6 py-10 text-white shadow-sm sm:px-10 sm:py-14">
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-28 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-sm ring-1 ring-inset ring-white/20">
              Explore Gear Catalog
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Gear built for modern creators
            </h1>
            <p className="text-sm text-purple-100 sm:text-base">
              Browse our curated selection of high-performance cameras, audio, lighting and more.
            </p>
          </div>
        </section>

        {/* Perks */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Icon />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Search, grid and pagination */}
        <ProductsBrowser products={products} />
      </div>
    </div>
  )
}