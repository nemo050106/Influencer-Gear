"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputField from "@/ui/InputField";
import Button from "@/ui/Button";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/validation";

type FieldErrors = Partial<Record<"email" | "password", string>>;

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);

    const fields = [
        { label: "Email Address", type: "email", name: "email", placeholder: "alex@influencergear.com" },
        { label: "Password", type: "password", name: "password", placeholder: "••••••••" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // clear that field's error as soon as the user edits it
        setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
        setLoginError("");
    };

    const loginButton = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");

        // 1. Validate with Zod
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
            const errors: FieldErrors = {};
            for (const issue of result.error.issues) {
                const key = issue.path[0] as keyof FieldErrors;
                if (key && !errors[key]) errors[key] = issue.message;
            }
            setFieldErrors(errors);
            return;
        }

        // 2. Sign in with the cleaned values
        setLoading(true);
        try {
            const { data, error } = await authClient.signIn.email({
                email: result.data.email,
                password: result.data.password,
            });

            if (error) {
                setLoginError(error.message || "Invalid email or password");
                return;
            }
            if (data) {
                router.push("/");
                router.refresh(); // so server components see the new session
            }
        } catch {
            setLoginError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
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

                <form onSubmit={loginButton} noValidate className="space-y-4">
                    {fields.map((field) => (
                        <InputField
                            key={field.name}
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name as keyof typeof formData]}
                            onChange={handleChange}
                            error={fieldErrors[field.name as keyof FieldErrors]}
                        />
                    ))}

                    {loginError && (
                        <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 ring-1 ring-inset ring-rose-600/20">
                            {loginError}
                        </p>
                    )}

                    <div className="pt-2">
                        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
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