import { cn } from '@/lib/utils';

export function Sidebar() {
  return (
    <aside className={cn("w-64 bg-secondary text-secondary-foreground p-4")}>
      <ul>
        <li className="mb-2"><a href="/dashboard">Dashboard</a></li>
        <li className="mb-2"><a href="/employees">Employees</a></li>
        <li className="mb-2"><a href="/departments">Departments</a></li>
      </ul>
    </aside>
  );
}
