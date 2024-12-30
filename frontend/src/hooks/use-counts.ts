import {useEffect, useState} from "react";
import {getPendingApprovals} from "@/service/approval";
import {getAllUsers} from "@/service/user";
import {getAllDepartments} from "@/service/department";

export function useCounts() {
  const [counts, setCounts] = useState({
    pendingApprovals: 0,
    totalEmployees: 0,
    totalDepartments: 0,
    departmentEmployees: {} as Record<number, number>
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const [pendingApprovals, employees, departments] = await Promise.all([
        getPendingApprovals(),
        getAllUsers(),
        getAllDepartments()
      ]);

      // Calculate department employee counts
      const deptCounts: Record<number, number> = {};
      employees.forEach(emp => {
        if (emp.department_id) {
          deptCounts[emp.department_id] = (deptCounts[emp.department_id] || 0) + 1;
        }
      });

      setCounts({
        pendingApprovals: pendingApprovals.length,
        totalEmployees: employees.length,
        totalDepartments: departments.length,
        departmentEmployees: deptCounts
      });
    };

    fetchCounts();
  }, []);

  return counts;
}
