import React, { useId } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

const baseInput =
    'w-full rounded-lg border px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 transition'

export default function Input({
    label,
    error,
    className = '',
    id,
    type = 'text',
    ...props
}: InputProps) {
    const generatedId = useId()
    const inputId = id ?? generatedId

    // Checkbox: label sits beside the box
    if (type === 'checkbox') {
        return (
            <label
                htmlFor={inputId}
                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
            >
                <input
                    id={inputId}
                    type="checkbox"
                    className={`h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 ${className}`}
                    {...props}
                />
                {label}
            </label>
        )
    }

    return (
        <div className="space-y-1">
            <label htmlFor={inputId} className="text-xs font-medium text-gray-500">
                {label}
            </label>
            <input
                id={inputId}
                type={type}
                aria-invalid={!!error}
                className={`${baseInput} ${
                    error
                        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20'
                        : 'border-gray-200 focus:border-purple-500 focus:ring-purple-500/20'
                } ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-rose-600">{error}</p>}
        </div>
    )
}