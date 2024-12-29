import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {lorelei} from "@dicebear/collection";
import {createAvatar} from "@dicebear/core";
import {getCurrentUser} from "@/service/auth";
import {UserType} from "@/service/schema/user";

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

export function AvatarUriFromName(name: string): string {
  const avatar = createAvatar(lorelei, {
    seed: name,
  });
  return avatar.toDataUri();
}

export async function isAdmin(): Promise<boolean> {
  if (!isTokenValid(loadToken())) return false;
  const user = await getCurrentUser();
  return user.userType === UserType.Admin;
}
