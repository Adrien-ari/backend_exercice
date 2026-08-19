import { z } from "zod";

export const studentSchema = z.object({
    first_name: z.string().min(1).max(100),
    last_name: z.string().min(1).max(100),
    date_of_birth: z.coerce.date(),
    address: z.string().min(1),
    email: z.string().email(),
});