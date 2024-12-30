import {del, get, post, put} from './api';
import {Department} from "@/service/schema/department";

export const getAllDepartments = async (): Promise<Department[]> => {
  return await get<Department[]>('/departments', {} as never);
};

export const createDepartment = async (data: Partial<Department>): Promise<Department> => {
  return await post<Department>('/departments', data as never);
};

export const updateDepartment = async (id: number, data: Partial<Department>): Promise<Department> => {
  return await put<Department>(`/departments/${id}`, data as never);
};

export const deleteDepartment = async (id: number): Promise<void> => {
  return await del(`/departments/${id}`, {} as never);
};
