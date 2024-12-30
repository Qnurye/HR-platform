import React from 'react';
import {Department} from "@/service/schema/department";
import {Button} from "@/components/ui/button";
import {PencilIcon, TrashIcon, UsersIcon} from "lucide-react";
import Link from "next/link";

interface DepartmentTreeProps {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
  isAdmin: boolean;
}

export function DepartmentTree({departments, onEdit, onDelete, isAdmin}: DepartmentTreeProps) {
  const renderDepartment = (department: Department, level: number = 0) => {
    return (
      <div key={department.id} className="w-full">
        <div
          className="flex flex-row justify-between bg-gray-50 p-4 rounded-lg mb-2"
          style={{marginLeft: `${level * 2}rem`}}
        >
          <div>
            <h3 className="text-xl font-semibold">{department.name}</h3>
            <p className="text-gray-600">{department.function_code}</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" asChild>
              <Link href={`/employees?department=${department.id}`}>
                <UsersIcon className="h-5 w-5 mr-1"/>
                查看成员
              </Link>
            </Button>
            {isAdmin && (
              <>
                <Button variant="ghost" size="icon" onClick={() => onEdit(department)}>
                  <PencilIcon className="h-4 w-4"/>
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive"
                        onClick={() => onDelete(department)}>
                  <TrashIcon className="h-4 w-4"/>
                </Button>
              </>
            )}
          </div>
        </div>
        {department.children && department.children.length > 0 && (
          <div className="ml-4">
            {department.children.map(child => renderDepartment(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      {departments.map(dept => renderDepartment(dept))}
    </div>
  );
} 