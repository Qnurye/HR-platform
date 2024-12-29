export interface Department {
    id: number;                 // 部门ID
    name: string;               // 部门名称
    functionCode: string;       // 部门职能编号
    parentDepartmentId?: number; // 上级部门ID
    createdAt: Date;            // 创建时间
    updatedAt: Date;            // 更新时间
    deletedAt?: Date;           // 软删除时间
    parentDepartment?: Department; // 上级部门
}
