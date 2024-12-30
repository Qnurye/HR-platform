import {User} from "@/service/schema/user";

export enum ApprovalType {
  General,
  Leave,
  Reimbursement
}

export enum ApprovalStatus {
  Suspend = -1,
  Active = 0,
  Inactive
}

export const ApprovalMap = {
  [ApprovalType.General]: '通用',
  [ApprovalType.Leave]: '请假',
  [ApprovalType.Reimbursement]: '报销'
}

export const ApprovalStatusMap = {
  [ApprovalStatus.Suspend]: "已拒绝",
  [ApprovalStatus.Active]: "未审批",
  [ApprovalStatus.Inactive]: "已通过"
};

export interface Approval {
  id: number;                 // 审批 ID
  employee_id: number;         // 员工 ID
  approval_type: ApprovalType; // 审批类型
  status: ApprovalStatus;             // 状态
  request_date: Date;          // 申请日期
  approval_date?: Date;        // 审批日期
  approver_id?: number;        // 审批人 ID
  comments?: string;          // 备注
  created_at: Date;            // 创建时间
  updated_at: Date;            // 更新时间
  deleted_at?: Date;           // 软删除时间
  employee: User;             // 员工
  approver?: User;            // 审批人
}
