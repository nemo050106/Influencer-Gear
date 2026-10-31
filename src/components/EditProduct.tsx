'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaEdit } from 'react-icons/fa'
import { updateProduct } from '@/lib/updateProduct'
import Input from '@/ui/Input'
import Button from '@/ui/Button'

interface EditProductButtonProps {
    product: {
        _id: string
        name: string
        price: number
        stock: number
        category: string
        image?: string
        isActive?: boolean
    }
}

export default function EditProductButton({ product }: EditProductButtonProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [form, setForm] = useState({
        name: product.name,
        price: String(product.price),
        stock: String(product.stock),
        category: product.category,
        image: product.image ?? '',
        isActive: product.isActive ?? true,
    })

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
        setError('')

        try {
            await updateProduct(product._id, {
                name: form.name,
                price: Number(form.price),
                stock: Number(form.stock),
                category: form.category,
                image: form.image,
                isActive: form.isActive,
            })
            setOpen(false)
            router.refresh()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-600 shadow-sm ring-1 ring-gray-900/5 transition hover:bg-purple-50"
            >
                <FaEdit /> Edit
            </button>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <h2 className="text-xl font-bold text-gray-900">Edit product</h2>

                        <Input label="Name" name="name" value={form.name} onChange={handleChange} required />

                        <div className="grid grid-cols-2 gap-3">
                            <Input label="Price" name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} required />
                            <Input label="Stock" name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
                        </div>

                        <Input label="Category" name="category" value={form.category} onChange={handleChange} required />

                        <Input label="Image URL" name="image" value={form.image} onChange={handleChange} />

                        <Input label="Active" name="isActive" type="checkbox" checked={form.isActive} onChange={handleChange} />

                        {error && <p className="text-sm text-rose-600">{error}</p>}

                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-500 disabled:opacity-60"
                            >
                                {loading ? 'Saving...' : 'Save changes'}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}