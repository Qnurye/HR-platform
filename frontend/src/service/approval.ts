import {get, post, put} from './api';
import {Approval} from '@/service/schema/approvel';

export const getAllApprovals = async (): Promise<Approval[]> => {
  return await get<Approval[]>('/approvals', {} as never);
};

export const getMyApprovals = async (): Promise<Approval[]> => {
  return await get<Approval[]>('/approvals/my', {} as never);
};

export const getPendingApprovals = async (): Promise<Approval[]> => {
  return await get<Approval[]>('/approvals/pending', {} as never);
};

export const createApproval = async (data: Partial<Approval>): Promise<Approval> => {
  return await post<Approval>('/approvals', data as never);
};

export const updateApproval = async (id: number, data: Partial<Approval>): Promise<Approval> => {
  return await put<Approval>(`/approvals/${id}`, data as never);
};
