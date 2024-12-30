"use client";

import {Building2Icon, ChevronDown, LogOutIcon, SignatureIcon, UsersRoundIcon} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {AvatarUriFromName, removeToken} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {APP_NAME} from "@/lib/AppConfig";
import Link from "next/link";
import React from "react";
import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useCurrentUser} from "@/hooks/use-current-user";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useCounts} from "@/hooks/use-counts";
import {getAllDepartments} from "@/service/department";
import {Department} from "@/service/schema/department";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";

export function AppSidebar() {
  const router = useRouter()
  const user = useCurrentUser()
  const counts = useCounts()
  const [departments, setDepartments] = React.useState<Department[]>([])

  React.useEffect(() => {
    getAllDepartments().then(setDepartments);
  }, []);

  const mainItems = [
    {
      title: "审批",
      url: "/approvals",
      icon: SignatureIcon,
      badge: counts.pendingApprovals
    },
    {
      title: "同事",
      url: "/employees",
      icon: UsersRoundIcon,
      badge: counts.totalEmployees
    }
  ];

  return (
    <Sidebar variant={"inset"} collapsible={"icon"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="/" className="flex items-center space-x-2">
              <span>{APP_NAME}</span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4"/>
                      <span>{item.title}</span>
                      {item.badge > 0 && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}


              <Collapsible defaultOpen={false} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Link href="/departments">
                        <Building2Icon className="w-4 h-4"/>
                      </Link>
                      <Link href="/departments" className="ml-2"> 部门 </Link>
                      {counts.totalDepartments > 0 && (
                        <SidebarMenuBadge>{counts.totalDepartments}</SidebarMenuBadge>
                      )}
                      <ChevronDown className="ml-auto mr-4 h-4 w-4"/>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenuSub>
                        {departments.map((dept) => (
                          <SidebarMenuSubItem key={dept.id}>
                            <Link
                              href={`/employees?department=${dept.id}`}
                              className="flex items-center space-x-2 w-full"
                            >
                              <span>{dept.name}</span>
                              {counts.departmentEmployees[dept.id] > 0 && (
                                <SidebarMenuBadge>
                                  {counts.departmentEmployees[dept.id]}
                                </SidebarMenuBadge>
                              )}
                            </Link>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => {
                  removeToken()
                  router.push("/signin")
                }}>
                  <LogOutIcon className="w-4 h-4"/>
                  <span> 退出登录 </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="size-8">
                    <AvatarImage src={AvatarUriFromName(user.user?.name || "")} alt={user.user?.name}/>
                    <AvatarFallback>{user.user?.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span>{user.user?.name}</span>
                  <ChevronDown className="ml-auto"/>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <Link href={`/employees/${user.user?.id}`}>
                    个人信息
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
