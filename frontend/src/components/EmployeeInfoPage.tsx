import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {
  BuildingIcon,
  CalendarIcon,
  FileTextIcon,
  GraduationCapIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon
} from 'lucide-react'
import {
  EducationLevelMap,
  EthnicityMap,
  GenderMap,
  PlaceOfOriginMap,
  PoliticalStatusMap,
  Status, UserStatusMap,
  User, UserTypeMap, PositionMap, TitleMap
} from "@/service/schema/user";
import {lorelei} from "@dicebear/collection";
import {createAvatar} from "@dicebear/core";
import {AvatarUriFromName} from "@/lib/utils";

interface EmployeeInfoPageProps {
  user: User
}

export function EmployeeInfoPage({user}: EmployeeInfoPageProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={AvatarUriFromName(user.name)}
                           alt={user.name}/>
              {/*<AvatarImage src={`data:image/jpeg;base64,${Buffer.from(user.photo).toString('base64')}`}*/}
              {/*             alt={user.name}/>*/}
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-muted-foreground">{PositionMap[user.position]} - {TitleMap[user.title]}</p>
              <Badge variant={user.status === Status.Active ? 'default' : 'secondary'}>{UserStatusMap[user.status]}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoSection title="个人信息">
              <InfoItem icon={<UserIcon className="mr-2"/>} label="性别" value={GenderMap[user.gender]}/>
              <InfoItem icon={<CalendarIcon className="mr-2"/>} label="生日" value={formatDate(user.birthday)}/>
              <InfoItem icon={<UserIcon className="mr-2"/>} label="民族" value={EthnicityMap[user.ethnicity]}/>
              <InfoItem icon={<UserIcon className="mr-2"/>} label="政治面貌" value={PoliticalStatusMap[user.politicalStatus]}/>
              <InfoItem icon={<GraduationCapIcon className="mr-2"/>} label="学历" value={EducationLevelMap[user.educationLevel]}/>
              <InfoItem icon={<UserIcon className="mr-2"/>} label="婚姻状况"
                        value={user.maritalStatus ? '已婚' : '未婚'}/>
              <InfoItem icon={<MapPinIcon className="mr-2"/>} label="籍贯"
                        value={`${PlaceOfOriginMap[user.placeOfOrigin]}`}/>
              <InfoItem icon={<FileTextIcon className="mr-2"/>} label="身份证号" value={user.idNumber}/>
            </InfoSection>

            <InfoSection title="联系方式">
              <InfoItem icon={<PhoneIcon className="mr-2"/>} label="电话号码" value={user.phoneNumber}/>
              <InfoItem icon={<MapPinIcon className="mr-2"/>} label="档案存放地" value={user.archiveLocation}/>
              <InfoItem icon={<MapPinIcon className="mr-2"/>} label="户口所在地" value={user.residenceLocation}/>
            </InfoSection>

            <InfoSection title="工作信息">
              <InfoItem icon={<FileTextIcon className="mr-2"/>} label="工作证号" value={user.workIdNumber}/>
              <InfoItem icon={<CalendarIcon className="mr-2"/>} label="入职日期" value={formatDate(user.hireDate)}/>
              <InfoItem icon={<BuildingIcon className="mr-2"/>} label="部门" value={user.department.name}/>
              {user.supervisor && (
                <InfoItem icon={<UserIcon className="mr-2"/>} label="主管" value={user.supervisor.name}/>
              )}
            </InfoSection>

            <InfoSection title="账户信息">
              <InfoItem label="用户名" value={user.username}/>
              <InfoItem label="用户类型" value={UserTypeMap[user.userType]}/>
              <InfoItem label="创建时间" value={formatDate(user.createdAt)}/>
              <InfoItem label="更新时间" value={formatDate(user.updatedAt)}/>
              {user.deletedAt && (
                <InfoItem label="删除时间" value={formatDate(user.deletedAt)}/>
              )}
            </InfoSection>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoSection({title, children}: { title: string, children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function InfoItem({icon, label, value}: { icon?: React.ReactNode, label: string, value: string | number }) {
  return (
    <div className="flex items-center">
      {icon}
      <span className="font-medium mr-2">{label}:</span>
      <span>{value}</span>
    </div>
  )
}

