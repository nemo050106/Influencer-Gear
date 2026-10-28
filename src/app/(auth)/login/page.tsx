"use client";

import React, { useState } from "react";
import Link from "next/link";
import InputField from "@/ui/InputField";
import Button from "@/ui/Button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";



export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState("");


    // Generic input change handler (DRY)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const router = useRouter()
    const fields = [
        {
            label: "Email Address",
            type: "email",
            name: "email",
            placeholder: "alex@influencergear.com",
        },
        {
            label: "Password",
            type: "password",
            name: "password",
            placeholder: "••••••••",
        },
    ];

    const loginButton = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = formData.email
        const password = formData.password

        const { data, error } = await authClient.signIn.email(
            {
                email: email, // required, The email address of the user.
                password: password,
            })
        if (data) {
            router.push('/')
        }
    };

    return (
        <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 bg-gray-50/50 h-screen">
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-indigo-500/5">

                {/* Header Logo & Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-200 mb-3">
                        <span className="text-base font-bold tracking-wider">IG</span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                        Welcome back
                    </h1>
                    <p className="mt-1.5 text-xs text-gray-500">
                        Sign in to access your <span className="font-semibold text-gray-700">Influencer Gear</span> account
                    </p>
                </div>

                {/* Form Container */}
                <form onSubmit={loginButton} className="space-y-4">

                    {/* DRY Mapping Over Input Fields */}
                    {fields.map((field) => (
                        <InputField
                            key={field.name}
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            error={field.name === "password" ? loginError : undefined}
                        />
                    ))}



                    <div className="pt-2">
                        <Button type="submit" variant="primary" className="w-full">
                            Sign In
                        </Button>
                    </div>
                </form>

                <p className="mt-6 text-center text-xs text-gray-500">
                    No account?{" "}
                    <Link href="/register" className="font-semibold text-indigo-600 hover:underline">
                        Create an account
                    </Link>
                </p>

            </div>
        </div>
    );
}