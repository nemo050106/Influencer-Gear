'use client'
import { getUser } from '@/lib/getUser'
import { UserProps } from '@/lib/types'
import Button from '@/ui/Button'
import { useEffect, useState } from 'react'

// Define the expected props interface
interface DetailsClientProps {
    inStock: boolean
}


export default function DetailsClient({ inStock }: DetailsClientProps) {

    const [user, setUser] = useState<UserProps | null>(null)
    const isAdmin = user?.role === 'admin'   // adjust to your UserProps shape

    const buttonLabel = !inStock
        ? 'Temporarily Unavailable'
        : isAdmin
            ? 'User Only'
            : 'Buy Now'

    const canBuy = inStock && !isAdmin

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUser()
            setUser(userData as UserProps)

        }
        fetchUserData()

    }, [])




    const buyButton = () => {
        console.log(9999)
    }

    return (
        <div>
            <div className="border-t border-gray-100 pt-6 space-y-4">
                <Button
                    onClick={buyButton}
                    disabled={!canBuy}
                    className={`w-full rounded-xl py-3.5 px-6 text-sm font-semibold shadow-sm transition-all duration-200 ${canBuy
                            ? 'bg-purple-600 text-white hover:bg-purple-500 hover:shadow-md hover:-translate-y-0.5'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    {buttonLabel}
                </Button>
            </div>
        </div>
    )
}