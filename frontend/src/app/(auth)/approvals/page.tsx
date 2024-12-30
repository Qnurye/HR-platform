"use client";

import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CalendarIcon, CheckIcon, ClockIcon, PlusIcon, UserIcon, XIcon} from "lucide-react";
import {Approval, ApprovalMap, ApprovalStatus} from "@/service/schema/approvel";
import {getAllApprovals, getMyApprovals, getPendingApprovals, updateApproval} from "@/service/approval";
import {ApprovalDialog} from "@/components/ApprovalDialog";
import {useCurrentUser} from "@/hooks/use-current-user";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {cn, formatDate} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("my");
  const {user} = useCurrentUser();

  const loadApprovals = async () => {
    let data: Approval[];
    switch (activeTab) {
      case "my":
        data = await getMyApprovals();
        break;
      case "pending":
        data = await getPendingApprovals();
        break;
      default:
        data = await getAllApprovals();
    }
    setApprovals(data);
  };

  useEffect(() => {
    loadApprovals();
  }, [activeTab]);

  const handleApprove = async (approval: Approval, approved: boolean) => {
    await updateApproval(approval.id, {
      status: approved ? ApprovalStatus.Inactive : ApprovalStatus.Suspend,
      approval_date: new Date(),
      approver_id: user?.id
    });
    await loadApprovals();
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl"> 审批 </CardTitle>
          <Button onClick={() => setDialogOpen(true)}>
            <PlusIcon className="h-4 w-4 mr-2"/>
            发起审批
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="my"> 我的审批 </TabsTrigger>
              <TabsTrigger value="pending"> 待我审批 </TabsTrigger>
              <TabsTrigger value="all"> 全部审批 </TabsTrigger>
            </TabsList>
            <TabsContent value="my" className="space-y-4">
              {approvals.map(approval => (
                <ApprovalCard
                  key={approval.id}
                  approval={approval}
                  showActions={false}
                  onApprove={() => {
                  }}
                  onReject={() => {
                  }}
                />
              ))}
            </TabsContent>
            <TabsContent value="pending" className="space-y-4">
              {approvals.map(approval => (
                <ApprovalCard
                  key={approval.id}
                  approval={approval}
                  showActions={true}
                  onApprove={() => handleApprove(approval, true)}
                  onReject={() => handleApprove(approval, false)}
                />
              ))}
            </TabsContent>
            <TabsContent value="all" className="space-y-4">
              {approvals.map(approval => (
                <ApprovalCard
                  key={approval.id}
                  approval={approval}
                  showActions={false}
                  onApprove={() => {
                  }}
                  onReject={() => {
                  }}
                />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ApprovalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={() => {
          setDialogOpen(false);
          loadApprovals();
        }}
      />
    </div>
  );
}

interface ApprovalCardProps {
  approval: Approval;
  showActions: boolean;
  onApprove: () => void;
  onReject: () => void;
}

function ApprovalCard({approval, showActions, onApprove, onReject}: ApprovalCardProps) {
  const isInactive = approval.status === ApprovalStatus.Inactive || approval.status === ApprovalStatus.Suspend;

  return (
    <Card className={cn(
      "transition-colors",
      isInactive && "opacity-60"
    )}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">
                {approval.employee.name} - {ApprovalMap[approval.approval_type]}
              </h3>
              <Badge variant={approval.status === ApprovalStatus.Active ? "default" :
                approval.status === ApprovalStatus.Inactive ? "secondary" : "destructive"}>
                {approval.status === ApprovalStatus.Active ? "待审批" :
                  approval.status === ApprovalStatus.Inactive ? "已通过" : "已拒绝"}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1"/>
                申请时间: {formatDate(approval.request_date)}
              </p>
              {approval.approval_date && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1"/>
                  审批时间: {formatDate(approval.approval_date)}
                </p>
              )}
              {approval.approver && (
                <p className="text-sm text-muted-foreground flex items-center">
                  <UserIcon className="h-4 w-4 mr-1"/>
                  审批人: {approval.approver.name}
                </p>
              )}
            </div>
            {approval.comments && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="text-sm">{approval.comments}</p>
              </div>
            )}
          </div>
          {showActions && (
            <div className="space-x-2">
              <Button variant="outline" onClick={onReject} className="text-destructive hover:text-destructive">
                <XIcon className="h-4 w-4 mr-1"/>
                拒绝
              </Button>
              <Button onClick={onApprove}>
                <CheckIcon className="h-4 w-4 mr-1"/>
                同意
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
