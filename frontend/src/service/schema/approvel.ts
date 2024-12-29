import {Status, User} from "@/service/schema/user";

export enum ApprovalType {
    General,
    Leave,
    Reimbursement
}

export const ApprovalMap = {
    [ApprovalType.General]: '通用',
    [ApprovalType.Leave]: '请假',
    [ApprovalType.Reimbursement]: '报销'
}

export interface Approval {
    id: number;                 // 审批 ID
    employeeId: number;         // 员工 ID
    approvalType: ApprovalType; // 审批类型
    status: Status;             // 状态
    requestDate: Date;          // 申请日期
    approvalDate?: Date;        // 审批日期
    approverId?: number;        // 审批人 ID
    comments?: string;          // 备注
    createdAt: Date;            // 创建时间
    updatedAt: Date;            // 更新时间
    deletedAt?: Date;           // 软删除时间
    employee: User;             // 员工
    approver?: User;            // 审批人
}
