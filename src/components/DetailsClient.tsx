'use client'
import { getUser } from '@/lib/getUser'
import { createOrder } from '@/lib/createOrder'
import { UserProps } from '@/lib/types'
import Button from '@/ui/Button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface DetailsClientProps {
    inStock: boolean
    productId: string
}

export default function DetailsClient({ inStock, productId }: DetailsClientProps) {
    const router = useRouter()
    const [user, setUser] = useState<UserProps | null>(null)
    const [loading, setLoading] = useState(false)

    const isAdmin = user?.role === 'admin'
    const canBuy = inStock && !isAdmin && !loading

    const buttonLabel = loading
        ? 'Placing order...'
        : !inStock
            ? 'Temporarily Unavailable'
            : isAdmin
                ? 'User Only'
                : 'Buy Now'

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUser()
            setUser(userData as UserProps | null)
        }
        fetchUserData()
    }, [])

    const buyButton = async () => {
        if (!user?.email) {
            toast.error('Please log in to buy this product.')
            return
        }

        setLoading(true)

        try {
            await createOrder({ productId, userEmail: user.email })
            toast.success('Order placed successfully!')
            router.refresh()
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="border-t border-gray-100 pt-6">
            <Button
                onClick={buyButton}
                disabled={!canBuy}
                className={`w-full rounded-xl px-6 py-3.5 text-sm font-semibold shadow-sm transition-all duration-200 ${
                    canBuy
                        ? 'bg-purple-600 text-white hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-md'
                        : 'cursor-not-allowed bg-gray-100 text-gray-400'
                }`}
            >
                {buttonLabel}
            </Button>
        </div>
    )
}