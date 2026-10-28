import { z } from "zod";

export const registrationSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().regex(
        /^(?=(?:.*[!@#$%^&*]){1,}).*$/, 
        "Password must include at least one symbols"
    ),
    confirmPassword: z.string(),
}).refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});