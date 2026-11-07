'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { FaBoxOpen } from 'react-icons/fa'
import { createProduct } from '@/lib/createProduct'
import Input from '@/ui/Input'
import Button from '@/ui/Button'

const initialForm = {
    name: '',
    price: '',
    stock: '',
    category: '',
    image: '',
    isActive: true,
}

export default function AddProductPage() {
    const router = useRouter()
    const [form, setForm] = useState(initialForm)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await createProduct({
                name: form.name,
                price: Number(form.price),
                stock: Number(form.stock),
                category: form.category,
                image: form.image,
                isActive: form.isActive,
            })
            toast.success('Product added')
            setForm(initialForm)
            router.push('/admin')
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to add product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <div>
                <Link
                    href="/admin"
                    className="text-sm font-semibold text-purple-600 transition-colors hover:text-purple-500"
                >
                    ← Back to dashboard
                </Link>
                <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Add{' '}
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        New Product
                    </span>
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Fill in the details to list a product in your store.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="grid gap-8 rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-8 md:grid-cols-5"
            >
                {/* Fields */}
                <div className="space-y-4 md:col-span-3">
                    <Input
                        label="Product name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Ergonomic Office Chair"
                        required
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <Input
                            label="Price ($)"
                            name="price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={form.price}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            label="Stock"
                            name="stock"
                            type="number"
                            min="0"
                            step="1"
                            value={form.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Input
                        label="Category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="e.g. Furniture"
                        required
                    />

                    <Input
                        label="Image URL"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="https://..."
                    />

                    <Input
                        label="Active (visible in the store)"
                        name="isActive"
                        type="checkbox"
                        checked={form.isActive}
                        onChange={handleChange}
                    />
                </div>

                {/* Live preview */}
                <div className="space-y-3 md:col-span-2">
                    <p className="text-xs font-medium text-gray-500">Preview</p>
                    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-900/5">
                        <div className="flex aspect-square items-center justify-center bg-gradient-to-tr from-indigo-50 to-purple-50">
                            {form.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={form.image} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                                <FaBoxOpen className="text-5xl text-purple-300" />
                            )}
                        </div>
                        <div className="space-y-1 p-4">
                            <span className="inline-flex rounded-lg bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-600">
                                {form.category || 'Category'}
                            </span>
                            <p className="truncate text-base font-bold text-gray-900">
                                {form.name || 'Product name'}
                            </p>
                            <p className="text-lg font-extrabold text-gray-900">
                                ${form.price || '0.00'}
                            </p>
                            <p className="text-xs text-gray-400">{form.stock || 0} in stock</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-6 md:col-span-5">
                    <Link
                        href="/admin"
                        className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                    >
                        Cancel
                    </Link>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Adding...' : 'Add product'}
                    </Button>
                </div>
            </form>
        </div>
    )
}