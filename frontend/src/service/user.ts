import {del, get, post, put} from './api';
import {User} from "@/service/schema/user";

export const getAllUsers = async (departmentId?: number): Promise<User[]> => {
  return await get<User[]>(departmentId ? `/users?department_id=${departmentId}` : '/users', {} as never);
};

export const getUser = async (id: number): Promise<User> => {
  return await get<User>(`/users/${id}`, {} as never);
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  return await post<User>('/users', data as never);
};

export const deleteUser = async (id: number): Promise<void> => {
  return await del<void>(`/users/${id}`, {} as never);
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User> => {
  return await put<User>(`/users/${id}`, data as never);
};

export const getUserByWorkId = async (workId: string): Promise<User | null> => {
  try {
    return await get<User>(`/users/work-id/${workId}`, {} as never);
  } catch (error) {
    console.error('Failed to get user by work ID:', error);
    return null;
  }
};
