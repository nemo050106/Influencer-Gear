import { ButtonProps } from '@/lib';
import React from 'react';

// 1. Define variants object first
const variants = {
  primary: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 hover:from-indigo-700 hover:to-violet-700",
  secondary: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-200",
};

// 2. Derive variant key type
type VariantType = keyof typeof variants;

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "rounded-xl px-5 py-2.5 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-50";

  // Safely cast variant to VariantType or default to "primary"
  const selectedVariant = variants[variant as VariantType] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${selectedVariant} ${className}`}
    >
      {children}
    </button>
  );
}