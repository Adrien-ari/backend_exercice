import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export interface JwtPayload {
    userId: number;
}

export function generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, SECRET, {
        expiresIn: "1h",
    });
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, SECRET) as JwtPayload;
}