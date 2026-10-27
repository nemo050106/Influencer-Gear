import { InputFieldProps } from '@/lib'

export default function InputField({ label,
    type,
    name,
    placeholder,
    value,
    onChange, }: InputFieldProps) {
    return (
        <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1.5">
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition"
            />
        </div>)
}
