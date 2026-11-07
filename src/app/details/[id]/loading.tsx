export default function DetailsLoading() {
  return (
    <div
      className="min-h-screen px-4 py-12 sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading product"
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="h-5 w-36 animate-pulse rounded bg-gray-200/70" />

        <div className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-gray-900/5 sm:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="aspect-square animate-pulse rounded-2xl bg-gray-200/70" />

            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div className="h-6 w-24 animate-pulse rounded-lg bg-gray-200/70" />
                <div className="h-6 w-28 animate-pulse rounded-full bg-gray-200/70" />
              </div>
              <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200/70" />
              <div className="h-8 w-20 animate-pulse rounded-full bg-gray-200/70" />
              <div className="h-24 animate-pulse rounded-2xl bg-gray-200/70" />
              <div className="h-12 animate-pulse rounded-xl bg-gray-200/70" />
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}