export default function Loading() {
  return (
    <div
      className="min-h-screen px-4 py-12 sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading products"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Hero skeleton */}
        <div className="h-48 animate-pulse rounded-3xl bg-gray-200/70 sm:h-56" />

        {/* Heading skeleton */}
        <div className="space-y-2">
          <div className="h-7 w-56 animate-pulse rounded bg-gray-200/70" />
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200/70" />
        </div>

        {/* Card skeletons */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl bg-white/90 shadow-sm ring-1 ring-gray-900/5"
            >
              <div className="aspect-[4/3] animate-pulse bg-gray-200/70" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200/70" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200/70" />
                <div className="h-7 w-1/2 animate-pulse rounded bg-gray-200/70" />
                <div className="h-10 animate-pulse rounded-xl bg-gray-200/70" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}