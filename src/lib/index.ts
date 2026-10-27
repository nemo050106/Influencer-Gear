// export interface InputFieldProps {
//     label: string;
//     type: string;
//     name: string;
//     placeholder: string;
//     value: string;
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

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