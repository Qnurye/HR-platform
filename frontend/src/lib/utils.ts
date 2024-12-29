import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setToken(token: string): void {
    localStorage.setItem('token', token);
}

export function loadToken(): string | null {
    return localStorage.getItem('token');
}

export function isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp > currentTime;
    } catch (e) {
        return false;
    }
}
