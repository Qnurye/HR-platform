import {EmployeeInfoPage} from '@/components/EmployeeInfoPage'
import {
  EducationLevel,
  Ethnicity,
  Gender,
  PlaceOfOrigin,
  PoliticalStatus,
  Position,
  Status,
  Title,
  User,
  UserType
} from "@/service/schema/user";
import {Department} from "@/service/schema/department";

const mockUser: User = {
  id: 1,
  username: "zhangsan",
  password: "hashed_password",
  userType: UserType.NormalUser,
  name: "张三",
  gender: Gender.Male,
  photo: new Uint8Array([/* ... */]), // This would be actual image data
  ethnicity: Ethnicity.Han,
  birthday: new Date("1990-01-01"),
  politicalStatus: PoliticalStatus.Mass,
  educationLevel: EducationLevel.Bachelor,
  maritalStatus: false,
  placeOfOrigin: PlaceOfOrigin.Beijing,
  idNumber: "110101199001011234",
  phoneNumber: "13800138000",
  archiveLocation: "北京市档案馆",
  residenceLocation: "北京市朝阳区",
  workIdNumber: "EMP001",
  hireDate: new Date("2020-01-01"),
  position: Position.Staff,
  title: Title.Engineer,
  status: Status.Active,
  departmentId: 1,
  createdAt: new Date("2020-01-01"),
  updatedAt: new Date("2023-06-01"),
  department: {
    id: 1,
    name: "技术部",
    functionCode: "TECH",
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2023-06-01"),
  } as Department,
}

export default function EmployeePage() {
  return <EmployeeInfoPage user={mockUser} />
}

