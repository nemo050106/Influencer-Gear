import React from 'react'
import { notFound } from 'next/navigation'
import { FaStar, FaBoxOpen, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import Link from 'next/link'
import { getProductsByid } from '@/lib/getProductsById'

export default async function ProductDetails({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    if (!id) {
        notFound()
    }

    let product;
    try {
        product = await getProductsByid({ id })
    } catch (error) {
        notFound()
    }

    if (!product) {
        notFound()
    }

    const inStock = product.stock > 0

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-gray-100/60 to-slate-200/50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Back Navigation Link */}
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-colors hover:text-purple-500"
                >
                    <span>←</span> Back to products
                </Link>

                {/* Main Glassmorphism Product Card */}
                <div className="overflow-hidden rounded-3xl bg-white/90 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-12 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        
                        {/* <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-50 to-purple-50 ring-1 ring-gray-900/5 flex flex-col items-center justify-center p-8 text-center group">
                            {product.image ? (
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="h-full w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="space-y-3 text-purple-400">
                                    <FaBoxOpen className="mx-auto text-6xl opacity-80" />
                                    <span className="text-xs font-medium text-gray-400">No Image Preview Available</span>
                                </div>
                            )}
                        </div> */}

                        {/* Right Column: Product Meta, Details & Purchase Action */}
                        <div className="flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                
                                {/* Category and Stock Status Header */}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="inline-flex items-center rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-500/10">
                                        {product.category}
                                    </span>

                                    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                                        inStock ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20'
                                    }`}>
                                        {inStock ? <FaCheckCircle className="text-emerald-500" /> : <FaTimesCircle className="text-rose-500" />}
                                        <span>{inStock ? `${product.stock} in stock` : 'Out of stock'}</span>
                                    </div>
                                </div>

                                {/* Product Name */}
                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    {product.name}
                                </h1>

                                {/* Price and Rating Row */}
                                <div className="flex items-center justify-between pt-2">
                                    <div>
                                        <span className="text-xs font-medium text-gray-400 block">Price</span>
                                        <p className="text-3xl font-extrabold text-gray-900">${product.price}</p>
                                    </div>

                                    {product.rating && (
                                        <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700 ring-1 ring-inset ring-amber-500/20">
                                            <FaStar className="text-amber-400" />
                                            <span>{product.rating}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100 pt-6 space-y-4">
                                <button
                                    disabled={!inStock}
                                    className={`w-full rounded-xl py-3.5 px-6 text-sm font-semibold shadow-sm transition-all duration-200 ${
                                        inStock 
                                            ? 'bg-purple-600 text-white hover:bg-purple-500 hover:shadow-md hover:-translate-y-0.5' 
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {inStock ? 'Add to Cart' : 'Temporarily Unavailable'}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}