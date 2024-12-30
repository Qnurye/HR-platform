"use client";

import {EmployeeInfoPage} from '@/components/EmployeeInfoPage';
import {useEffect, useState} from 'react';
import {User} from "@/service/schema/user";
import {getUser} from "@/service/user";
import {useParams} from "next/navigation";
import LoadingPage from "@/components/LoadingPage";

export default function EmployeePage() {
  const [user, setUser] = useState<User | null>(null);
  const {id} = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      getUser(id as unknown as number).then(setUser);
    }
  }, [id]);

  if (!user) {
    return <LoadingPage/>;
  }

  return <EmployeeInfoPage user={user}/>;
}

