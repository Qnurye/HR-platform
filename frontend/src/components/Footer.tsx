import {cn} from '@/lib/utils';
import Link from "next/link";

export function Footer() {
  return (
    <footer className={cn("text-muted-foreground text-xs p-2")}>
      <div className="container mx-auto text-center">
        <p>&copy; 2024 <Link href={"https://qnury.es/"} className="italic font-light font-mono">qnury.e&#39;s</Link>.
          All rights reserved.</p>
      </div>
    </footer>
  );
}
