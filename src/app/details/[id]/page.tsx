import { notFound } from 'next/navigation'
import { FaStar, FaBoxOpen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import Link from 'next/link'
import { getProductsByid } from '@/lib/getProductsById'
import DetailsClient from '@/components/DetailsClient'
import EditProductButton from '@/components/EditProduct'

export default async function ProductDetails({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    if (!id) notFound()

    let product
    try {
        product = await getProductsByid({ id })
    } catch {
        notFound()
    }

    if (!product) notFound()

    const inStock = product.stock > 0

    return (
        <div className="min-h-screen bg-[#c5b9b91d] from-indigo-100/40 via-gray-100/60 to-slate-200/50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-6">

                {/* Top bar: back link + edit (outside the card so the modal isn't clipped) */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-colors hover:text-purple-500"
                    >
                        <span>←</span> Back to products
                    </Link>

                    <EditProductButton product={product} />
                </div>

                {/* Product card */}
                <div className="overflow-hidden rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-10">
                    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">

                        <div className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-50 to-purple-50 ring-1 ring-gray-900/5">
                            {product.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-3 text-purple-300">
                                    <FaBoxOpen className="text-6xl" />
                                    <span className="text-xs font-medium text-gray-400">
                                        No image available
                                    </span>
                                </div>
                            )}

                            {product.isActive === false && (
                                <span className="absolute left-3 top-3 rounded-full bg-gray-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                                    Inactive
                                </span>
                            )}
                        </div>

                        {/* Right: details */}
                        <div className="flex flex-col gap-6">
                            <div className="space-y-4">

                                {/* Category + stock */}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                                        {product.category}
                                    </span>

                                    <div
                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${
                                            inStock
                                                ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
                                                : 'bg-rose-50 text-rose-700 ring-rose-600/20'
                                        }`}
                                    >
                                        {inStock ? (
                                            <FaCheckCircle className="text-emerald-500" />
                                        ) : (
                                            <FaTimesCircle className="text-rose-500" />
                                        )}
                                        <span>
                                            {inStock ? `${product.stock} in stock` : 'Out of stock'}
                                        </span>
                                    </div>
                                </div>

                                {/* Name */}
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {product.name}
                                </h1>

                                {/* Rating */}
                                {product.rating && (
                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-500/20">
                                        <FaStar className="text-amber-400" />
                                        <span>{product.rating}</span>
                                    </div>
                                )}
                            </div>

                            {/* Price panel */}
                            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-5 ring-1 ring-inset ring-purple-100">
                                <span className="block text-xs font-medium uppercase tracking-wide text-purple-400">
                                    Price
                                </span>
                                <p className="mt-1 text-4xl font-extrabold text-gray-900">
                                    ${product.price}
                                </p>
                            </div>

                            {/* Buy action */}
                            <DetailsClient inStock={inStock} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}