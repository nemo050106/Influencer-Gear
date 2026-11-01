interface ErrorBannerProps {
  message: string
  onRetry: () => void
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-rose-50 px-5 py-3 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">
      <span>{message} Check the browser console and your server logs.</span>
      <button
        type="button"
        onClick={onRetry}
        className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 shadow-sm ring-1 ring-rose-600/20 transition hover:bg-rose-100"
      >
        Retry
      </button>
    </div>
  )
}