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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ApprovalMap, ApprovalStatus, ApprovalType} from "@/service/schema/approvel";
import React, {useEffect, useState} from "react";
import {createApproval} from "@/service/approval";
import {useCurrentUser} from "@/hooks/use-current-user";
import {getUserByWorkId} from "@/service/user";
import {toast} from "sonner";

interface ApprovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ApprovalDialog({
                                 open,
                                 onOpenChange,
                                 onSuccess
                               }: ApprovalDialogProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<ApprovalType>(ApprovalType.General);
  const [comments, setComments] = useState('');
  const [approverWorkId, setApproverWorkId] = useState('');
  const {user: currentUser} = useCurrentUser();

  useEffect(() => {
    if (open && currentUser?.supervisor?.work_id_number) {
      setApproverWorkId(currentUser.supervisor.work_id_number);
    }
  }, [open, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const approver = await getUserByWorkId(approverWorkId);

      if (!approver) {
        toast.error("找不到指定的审批人");
        return;
      }

      if (currentUser?.supervisor_id !== approver.id) {
        toast.error("只能选择直属上级作为审批人");
        return;
      }

      await createApproval({
        approval_type: type,
        comments,
        request_date: new Date(),
        employee_id: currentUser?.id,
        approver_id: approver.id,
        status: ApprovalStatus.Active
      });

      onSuccess();
      toast.success("审批申请已提交");
    } catch (error) {
      toast.error("提交审批失败");
      console.error('Failed to create approval:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> 发起审批 </DialogTitle>
          <DialogDescription>
            请填写审批信息
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label> 审批类型 </Label>
              <Select
                value={type.toString()}
                onValueChange={(value) => setType(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ApprovalType)
                  .filter(([key]) => isNaN(Number(key)))
                  .map(([, value]) => (
                    <SelectItem key={value} value={value.toString()}>
                      {ApprovalMap[value as ApprovalType]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label> 审批人工号 </Label>
              <Input
                value={approverWorkId}
                onChange={(e) => setApproverWorkId(e.target.value)}
                placeholder="请输入审批人工号"
                required
                disabled
              />
              {currentUser?.supervisor && (
                <p className="text-sm text-muted-foreground">
                  审批人: {currentUser.supervisor.name}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label> 备注 </Label>
              <Input
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="请输入备注信息"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              提交
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
