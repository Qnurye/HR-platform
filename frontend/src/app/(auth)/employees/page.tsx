"use client";

import {useEffect, useState} from "react";
import {User} from "@/service/schema/user";
import {getAllUsers} from "@/service/user";
import UserTable from "@/components/UserTable";
import {useSearchParams} from "next/navigation";
import LoadingPage from "@/components/LoadingPage";

export default function EmployeesPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const searchParams = useSearchParams();
  const departmentId = searchParams.get('department');

  useEffect(() => {
    console.log(departmentId);
    getAllUsers(departmentId ? Number(departmentId) : undefined).then(setUsers);
  }, [departmentId]);

  if (!users) {
    return (
      <LoadingPage/>
    );
  }

  return (
    <UserTable users={users}/>
  );
}
