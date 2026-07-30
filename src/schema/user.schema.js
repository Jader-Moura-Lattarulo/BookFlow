import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(3, {message: "Username must be at least 3 characters long"}),
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters long"})
        .regex(/[0-9]/, {
            message: "Password must contain at least one number"
        })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter"
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter"
        })
        .regex(/[^A-Za-z0-9]/, {
            message: "Password must contain at least one special character"
        }),
    avatar: z.string().url({message: "Invalid avatar URL"}).optional()
})

export { userSchema };
