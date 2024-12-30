"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import React from "react";
import Link from "next/link";
import {APP_NAME} from "@/lib/AppConfig";
import {BicepsFlexedIcon} from "lucide-react";
import {AvatarUriFromName, cn, isTokenValid, loadToken} from "@/lib/utils";
import {User} from "@/service/schema/user";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {getCurrentUser} from "@/service/auth";
import {SidebarTrigger} from "@/components/ui/sidebar";

export function Navbar() {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    const token = loadToken();
    if (isTokenValid(token)) {
      getCurrentUser().then((user) => setUser(user));
    }
  }, []);

  return (
    <div className="w-full h-fit p-2 shadow-md flex flex-row justify-between items-center">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center space-x-4">
          <SidebarTrigger/>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "space-x-2 font-bold text-blue-600 hover:text-blue-800")}>
                <BicepsFlexedIcon className="w-6 h-6"/>
                <span>{APP_NAME}</span>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        {user ? (
          <Link href={`/employees/${user.id}`} passHref>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={AvatarUriFromName(user.name)} alt={user.name}/>
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{user.name}</span>
            </Button>
          </Link>
        ) : (
          <Button className="text-blue-600 bg-transparent border border-blue-600 hover:bg-blue-600 hover:text-white">
            登录
          </Button>
        )}
      </div>
    </div>
  );
}
