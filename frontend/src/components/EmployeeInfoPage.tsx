import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {
  BuildingIcon,
  CalendarIcon,
  FileTextIcon,
  GraduationCapIcon,
  MapPinIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon
} from 'lucide-react'
import {
  EducationLevelMap,
  EthnicityMap,
  GenderMap,
  PlaceOfOriginMap,
  PoliticalStatusMap,
  PositionMap,
  TitleMap,
  User,
  UserStatus,
  UserStatusMap,
  UserType,
  UserTypeMap
} from "@/service/schema/user";
import {AvatarUriFromName, formatDate} from "@/lib/utils";
import React from "react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useCurrentUser} from "@/hooks/use-current-user";
import Link from "next/link";

interface EmployeeInfoPageProps {
  user: User
}

export function EmployeeInfoPage({user}: EmployeeInfoPageProps) {
  const router = useRouter();
  const {user: currentUser} = useCurrentUser();
  const canEdit = currentUser?.user_type === UserType.Admin || currentUser?.id === user.id;

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex flex-col sm:flex-row items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={AvatarUriFromName(user.name)} alt={user.name}/>
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="mt-4 sm:mt-0">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <p className="text-muted-foreground">{PositionMap[user.position]} - {TitleMap[user.title]}</p>
                <Badge variant={user.status === UserStatus.Active ? 'default' : 'secondary'}>
                  {UserStatusMap[user.status]}
                </Badge>
              </div>
            </div>
            {canEdit && (
              <Button
                variant="outline"
                onClick={() => router.push(`/employees/${user.id}/edit`)}
                className="mt-4 sm:mt-0"
              >
                <PencilIcon className="h-4 w-4 mr-2"/>
                编辑信息
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoSection title="个人信息" icon={<UserIcon className="h-6 w-6"/>}>
              <InfoItem icon={<UserIcon className="h-5 w-5"/>} label="性别" value={GenderMap[user.gender]}/>
              <InfoItem icon={<CalendarIcon className="h-5 w-5"/>} label="生日" value={formatDate(user.birthday)}/>
              <InfoItem icon={<UserIcon className="h-5 w-5"/>} label="民族" value={EthnicityMap[user.ethnicity]}/>
              <InfoItem icon={<UserIcon className="h-5 w-5"/>} label="政治面貌"
                        value={PoliticalStatusMap[user.political_status]}/>
              <InfoItem icon={<GraduationCapIcon className="h-5 w-5"/>} label="学历"
                        value={EducationLevelMap[user.education_level]}/>
              <InfoItem icon={<UserIcon className="h-5 w-5"/>} label="婚姻状况"
                        value={user.marital_status ? '已婚' : '未婚'}/>
              <InfoItem icon={<MapPinIcon className="h-5 w-5"/>} label="籍贯"
                        value={`${PlaceOfOriginMap[user.place_of_origin]}`}/>
              <InfoItem icon={<FileTextIcon className="h-5 w-5"/>} label="身份证号" value={user.id_number}/>
            </InfoSection>

            <InfoSection title="联系方式" icon={<PhoneIcon className="h-6 w-6"/>}>
              <InfoItem icon={<PhoneIcon className="h-5 w-5"/>} label="电话号码" value={user.phone_number}/>
              <InfoItem icon={<MapPinIcon className="h-5 w-5"/>} label="档案存放地" value={user.archive_location}/>
              <InfoItem icon={<MapPinIcon className="h-5 w-5"/>} label="户口所在地"
                        value={user.residence_location}/>
            </InfoSection>

            <InfoSection title="工作信息" icon={<BuildingIcon className="h-6 w-6"/>}>
              <InfoItem icon={<FileTextIcon className="h-5 w-5"/>} label="工作证号" value={user.work_id_number}/>
              <InfoItem icon={<CalendarIcon className="h-5 w-5"/>} label="入职日期"
                        value={formatDate(user.hire_date)}/>
              <InfoItem icon={<BuildingIcon className="h-5 w-5"/>} label="部门" value={user.department?.name}
                        link={`/employees?department=${user.department_id}`}/>
              {user.supervisor && (
                <InfoItem icon={<UserIcon className="h-5 w-5"/>} label="主管" value={user.supervisor.name}
                          link={`/employees/${user.supervisor_id}`}/>
              )}
            </InfoSection>

            <InfoSection title="账户信息" icon={<UserIcon className="h-6 w-6"/>}>
              <InfoItem label="用户名" value={user.username}/>
              <InfoItem label="用户类型" value={UserTypeMap[user.user_type]}/>
              <InfoItem label="创建时间" value={formatDate(user.created_at)}/>
              <InfoItem label="更新时间" value={formatDate(user.updated_at)}/>
            </InfoSection>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoSection({title, icon, children}: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="mb-6 bg-card rounded-lg p-6 border shadow-sm">
      <div className="flex items-center mb-4">
        <div className="bg-primary/10 text-primary p-2 rounded-full mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function InfoItem({icon, label, value, link}: {
  icon?: React.ReactNode,
  label: string,
  value: string | number,
  link?: string
}) {
  return (
    <div className="flex items-center bg-muted/50 p-3 rounded-md">
      {icon && <div className="text-primary mr-3">{icon}</div>}
      <span className="font-medium text-muted-foreground mr-2">{label}:</span>
      {link ? (
        <Link href={link} className="text-primary hover:underline">{value}</Link>
      ) : (
        <span className="text-foreground">{value}</span>
      )}
    </div>
  )
}

