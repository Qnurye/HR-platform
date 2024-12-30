"use client";

import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Department} from "@/service/schema/department";
import {useEffect, useState} from "react";
import {createDepartment, updateDepartment} from "@/service/department";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

interface DepartmentDialogProps {
  department?: Department | null;
  departments: Department[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function DepartmentDialog({
                                   department,
                                   departments,
                                   open,
                                   onOpenChange,
                                   onSuccess
                                 }: DepartmentDialogProps) {
  const [name, setName] = useState(department?.name || '');
  const [functionCode, setFunctionCode] = useState(department?.function_code || '');
  const [parentDepartmentId, setParentDepartmentId] = useState<string>(
    department?.parent_department_id?.toString() || 'none'
  );

  useEffect(() => {
    setName(department?.name || '');
    setFunctionCode(department?.function_code || '');
    setParentDepartmentId(department?.parent_department_id?.toString() || 'none');
  }, [department]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (department) {
        await updateDepartment(department.id, {
          name,
          function_code: functionCode,
          parent_department_id: parentDepartmentId === 'none' ? null : parseInt(parentDepartmentId),
        });
      } else {
        await createDepartment({
          name,
          function_code: functionCode,
          parent_department_id: parentDepartmentId === 'none' ? null : parseInt(parentDepartmentId),
        });
      }
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{department ? '编辑部门' : '新增部门'}</DialogTitle>
          <DialogDescription>
            请填写部门信息
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name"> 部门名称 </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入部门名称"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="functionCode"> 职能编号 </Label>
              <Input
                id="functionCode"
                value={functionCode}
                onChange={(e) => setFunctionCode(e.target.value)}
                placeholder="请输入职能编号"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parentDepartment"> 上级部门 </Label>
              <Select
                value={parentDepartmentId}
                onValueChange={setParentDepartmentId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择上级部门"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">无上级部门</SelectItem>
                  {departments
                  .filter(dept => dept.id !== department?.id)
                  .map(dept => (
                    <SelectItem key={dept.id} value={dept.id.toString()}>
                      {dept.name}
                    </SelectItem>
                  ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              确定
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
