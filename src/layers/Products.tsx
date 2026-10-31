import React from 'react'

import { getPaginatedProducts } from '@/lib/getProducts'
import Card from '@/ui/Card'
import Pagination from '@/ui/Pagination'

const LIMIT = 10 // products per page

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Math.max(1, Number(page) || 1)

  // ask the backend for only this page's products
  const { products, total } = await getPaginatedProducts(currentPage, LIMIT)
  const totalPages = Math.ceil(total / LIMIT)

  return (
    <div className="relative min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-gray-100/60 to-slate-200/50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow effect matching home hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-3 py-1 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-500/10 shadow-sm">
             Explore Gear Catalog
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Products</span>
          </h1>
          <p className="text-sm text-gray-600 max-w-xl">
            Browse through our curated selection of high-performance gear designed for modern creators.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card product={product} key={product._id} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/"
          />
        </div>
      </div>
    </div>
  )
}