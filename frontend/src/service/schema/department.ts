export interface Department {
  id: number;                 // 部门ID
  name: string;               // 部门名称
  function_code: string;       // 部门职能编号
  parent_department_id?: number | null; // 上级部门ID
  created_at: Date;            // 创建时间
  updated_at: Date;            // 更新时间
  parent_department?: Department; // 上级部门
  children?: Department[];
}
