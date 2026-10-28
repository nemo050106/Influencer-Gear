"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputField from "@/ui/InputField";
import Button from "@/ui/Button";
import { registrationSchema } from "@/lib/validation";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const router = useRouter()

    const fields = [
        { label: "Full Name", type: "text", name: "name", placeholder: "Alex Rivera" },
        { label: "Email Address", type: "email", name: "email", placeholder: "alex@influencergear.com" },
        { label: "Password", type: "password", name: "password", placeholder: "••••••••" },
        { label: "Confirm Password", type: "password", name: "confirmPassword", placeholder: "••••••••" },
    ];

    const RegisterButton = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Run Zod validation against the form state
        const result = registrationSchema.safeParse(formData);

        // 2. Check if validation failed
        if (!result.success) {
            const formattedErrors: Record<string, string> = {};

            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as string;
                formattedErrors[fieldName] = issue.message;
            });

            setErrors(formattedErrors);
            return;
        }

        // 3. Clear errors and set loading state
        setErrors({});
        setIsLoading(true);

        // 4. Call Better Auth sign-up endpoint
        const { data, error } = await authClient.signUp.email(
            {
                email: result.data.email,
                password: result.data.password,
                name: result.data.name,
            },
            // {
            //     onRequest: () => {
            //         setIsLoading(true);
            //     },
            //     onSuccess: () => {
            //         setIsLoading(false);
            //         router.push("/dashboard");
            //     },
            //     onError: (ctx) => {
            //         setIsLoading(false);
            //         alert(ctx.error.message);
            //     },
            // }
        );
        if(data){
            router.push('/login')
        }
    };

    return (
        <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 bg-gray-50/50 h-screen">
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-indigo-500/5">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-200 mb-3">
                        <span className="text-base font-bold tracking-wider">IG</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Create your account
                    </h1>
                    <p className="mt-1.5 text-xs text-gray-500">
                        Join <span className="font-semibold text-gray-700">Influencer Gear</span> and gear up your workflow
                    </p>
                </div>

                {/* Form Container */}
                <form onSubmit={RegisterButton} className="space-y-4">

                    {/* Mapping over the fields config using the external component */}
                    {fields.map((field) => (
                        <InputField
                            key={field.name}
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name as keyof typeof formData]}
                            error={errors[field.name]} // <-- Pass specific error message here
                            onChange={handleChange}
                        />
                    ))}




                    <Button type={"button"} onClick={RegisterButton} variant="secondary">Create Account</Button>
                </form>

                {/* Footer Link */}
                <p className="mt-6 text-center text-xs text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-indigo-600 hover:underline">
                        Sign In
                    </Link>
                </p>

            </div>
        </div>
    );
}