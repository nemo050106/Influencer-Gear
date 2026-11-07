

// inside your lib file (e.g., lib/index.ts)
export type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UserProps {
  createdAt: Date
  email: string
  emailVerified: boolean
  id: string
  name: string
  role: string
  updatedAt: Date
  image?: string | null | undefined;

}


export interface Product {
  _id: string
  name: string
  category: string
  price: number
  stock: number
  rating: number
  image: string
  isActive: boolean
  
}

export type PaginatedProducts = {
  products: Product[];
  total: number;
};

export interface UpdateProductPayload {
    name: string
    price: number
    stock: number
    category: string
    image?: string
    isActive?: boolean
}