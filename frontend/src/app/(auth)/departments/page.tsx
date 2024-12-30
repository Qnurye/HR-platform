"use client";

import React, {useEffect, useState} from 'react';
import {deleteDepartment, getAllDepartments} from '@/service/department';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Department} from "@/service/schema/department";
import {PlusIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCurrentUser} from "@/hooks/use-current-user";
import {UserType} from "@/service/schema/user";
import {DepartmentDialog} from "@/components/DepartmentDialog";
import {DepartmentTree} from "@/components/DepartmentTree";
import {buildDepartmentTree} from "@/lib/utils";

function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {user} = useCurrentUser();
  const isAdmin = user?.user_type === UserType.Admin;

  useEffect(() => {
    getAllDepartments().then(setDepartments);
  }, []);

  const handleAddDepartment = () => {
    setSelectedDepartment(null);
    setDialogOpen(true);
  };

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setDialogOpen(true);
  };

  const handleDeleteDepartment = (department: Department) => {
    deleteDepartment(department.id).then(() => {
      getAllDepartments().then(setDepartments);
    });
  }

  const departmentTree = buildDepartmentTree(departments);

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">部门</CardTitle>
          {isAdmin && (
            <Button onClick={handleAddDepartment}>
              <PlusIcon className="h-4 w-4 mr-2"/>
              添加部门
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <DepartmentTree
            departments={departmentTree}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteDepartment}
            isAdmin={isAdmin}
          />
        </CardContent>
      </Card>
      <DepartmentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        department={selectedDepartment}
        departments={departments}
        onSuccess={() => {
          setDialogOpen(false);
          getAllDepartments().then(setDepartments);
        }}
      />
    </div>
  );
}

export default DepartmentsPage;
