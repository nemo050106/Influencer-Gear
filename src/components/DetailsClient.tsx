'use client'
import Button from '@/ui/Button'

// Define the expected props interface
interface DetailsClientProps {
    inStock: boolean
}

export default function DetailsClient({ inStock }: DetailsClientProps) {

    const buyButton = () => {
        console.log(9999)
    }

    return (
        <div>
            <div className="border-t border-gray-100 pt-6 space-y-4">
                <Button 
                    onClick={buyButton}
                    disabled={!inStock}
                    className={`w-full rounded-xl py-3.5 px-6 text-sm font-semibold shadow-sm transition-all duration-200 ${
                        inStock
                            ? 'bg-purple-600 text-white hover:bg-purple-500 hover:shadow-md hover:-translate-y-0.5'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    {inStock ? 'Buy Now' : 'Temporarily Unavailable'}
                </Button>
            </div>
        </div>
    )
}