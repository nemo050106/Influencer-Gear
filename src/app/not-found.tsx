import Link from 'next/link'
import { FaBoxOpen } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-3xl bg-white/90 p-8 text-center shadow-sm ring-1 ring-gray-900/5 backdrop-blur-sm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-3xl text-purple-300">
          <FaBoxOpen />
        </div>

        <div className="space-y-2">
          <p className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent">
            404
          </p>
          <h1 className="text-xl font-bold text-gray-900">Page not found</h1>
          <p className="text-sm text-gray-500">
            The page you are looking for does not exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-500 hover:shadow-md"
          >
            Back to products
          </Link>
          
        </div>
      </div>
    </div>
  )
}