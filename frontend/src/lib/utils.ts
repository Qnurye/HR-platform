import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {lorelei} from "@dicebear/collection";
import {createAvatar} from "@dicebear/core";
import {getCurrentUser} from "@/service/auth";
import {UserType} from "@/service/schema/user";
import {Department} from "@/service/schema/department";

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

export function removeToken(): void {
  localStorage.removeItem('token');
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
  return user.user_type === UserType.Admin;
}

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function buildDepartmentTree(departments: Department[]): Department[] {
  const departmentMap = new Map<number, Department>();
  const roots: Department[] = [];

  // First pass: create a map of all departments
  departments.forEach(dept => {
    departmentMap.set(dept.id, {...dept, children: []});
  });

  // Second pass: build the tree structure
  departments.forEach(dept => {
    const department = departmentMap.get(dept.id)!;
    if (dept.parent_department_id) {
      const parent = departmentMap.get(dept.parent_department_id);
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(department);
      }
    } else {
      roots.push(department);
    }
  });

  return roots;
}
