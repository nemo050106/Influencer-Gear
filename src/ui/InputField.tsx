
import { InputFieldProps } from "@/lib/types";



export default function InputField({
    label,
    type,
    name,
    placeholder,
    value,
    error,
    onChange,
}: InputFieldProps) {
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
                className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 transition ${error
                    ? "border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10"
                    : "border-gray-200 bg-gray-50/50 focus:border-indigo-500 focus:bg-white focus:ring-indigo-500/10"
                    }`}
            />
            {error && (
                <p className="mt-1 text-xs font-medium text-red-500">{error}</p>
            )}
        </div>
    );
}