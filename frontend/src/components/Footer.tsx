import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className={cn("bg-muted text-muted-foreground p-4")}>
      <div className="container mx-auto text-center">
        <p>&copy; 2023 Employee Management System. All rights reserved.</p>
      </div>
    </footer>
  );
}
