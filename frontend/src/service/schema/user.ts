import {Department} from "@/service/schema/department";

export enum UserType {
  Admin = 1,
  NormalUser = 2
}

export enum Gender {
  Male = -1,
  NonBi,
  Female
}

export enum Ethnicity {
  Achang = 0,
  Bai,
  Bonan,
  Blang,
  Bouyei,
  Korean,
  Daur,
  Dai,
  Deang,
  Dongxiang,
  Dong,
  Drung,
  Ewenki,
  Evenk,
  Gaoshan,
  Gelao,
  Hani,
  Kazak,
  Han,
  Hezhe,
  Hui,
  Jino,
  Jing,
  Jingpo,
  Kirgiz,
  Lahu,
  Li,
  Lisu,
  Lhoba,
  Manchu,
  Maonan,
  Menba,
  Mongol,
  Miao,
  Mulam,
  Naxi,
  Nu,
  Pumi,
  Qiang,
  Sala,
  She,
  Shui,
  Tajik,
  Tatar,
  Tujia,
  Tu,
  Wa,
  Uyghur,
  Uzbek,
  Xibe,
  Yao,
  Yi,
  Yugur,
  Tibetan,
  Zhuang
}

export enum PoliticalStatus {
  PartyMember,
  YouthLeagueMember,
  Mass,
  Other
}

export enum EducationLevel {
  Doctor,
  Master,
  Bachelor,
  Associate,
  JuniorCollege,
  HighSchool,
  MiddleSchool,
  PrimarySchool,
  None
}

export enum PlaceOfOrigin {
  Anhui = 0,
  Beijing,
  Chongqing,
  Fujian,
  Gansu,
  Guangdong,
  Guangxi,
  Guizhou,
  Hainan,
  Hebei,
  Heilongjiang,
  Henan,
  Hubei,
  Hunan,
  InnerMongolia,
  Jiangsu,
  Jiangxi,
  Jilin,
  Liaoning,
  Ningxia,
  Qinghai,
  Shaanxi,
  Shandong,
  Shanghai,
  Shanxi,
  Sichuan,
  Tianjin,
  Tibet,
  Xinjiang,
  Yunnan,
  Zhejiang
}

export enum Position {
  Staff = 0,
  Manager,
  Executive
}

export enum Title {
  CEO = 0,
  CFO,
  COO,
  CTO,
  CMO,
  CIO,
  CHRO,
  CSO,
  CPO,
  VP,
  GeneralManager,
  Director,
  TeamLeader,
  Supervisor,
  Consultant,
  Analyst,
  Engineer,
  Developer,
  Designer,
  Architect,
  Accountant,
  Auditor,
  Lawyer,
  Paralegal,
  Recruiter,
  Trainer,
  Assistant,
  Secretary,
  Intern,
  SalesRepresentative,
  MarketingSpecialist,
  CustomerServiceRepresentative,
  BusinessDevelopmentManager,
  ProjectManager,
  ProductManager,
  OperationsManager,
  HRSpecialist,
  FinanceManager,
  ITSpecialist,
  DataScientist,
  Researcher,
  ContentCreator,
  Copywriter,
  Editor,
  PRSpecialist,
  LogisticsCoordinator,
  QualityAssuranceSpecialist,
  SecuritySpecialist
}

export enum Status {
  Active = 0,
  Inactive
}

export interface User {
  id: number;                // 员工 ID
  username: string;          // 用户名
  password: string;          // 密码哈希值
  userType: UserType;        // 用户类型
  name: string;              // 姓名
  gender: Gender;            // 性别
  photo: Uint8Array;         // 照片
  ethnicity: Ethnicity;      // 民族
  birthday: Date;            // 生日
  politicalStatus: PoliticalStatus; // 政治面貌
  educationLevel: EducationLevel;   // 学历
  maritalStatus: boolean;    // 婚姻状况
  placeOfOrigin: PlaceOfOrigin;     // 籍贯
  idNumber: string;          // 身份证号
  phoneNumber: string;       // 电话号码
  archiveLocation: string;   // 档案存放地
  residenceLocation: string; // 户口所在地
  workIdNumber: string;      // 工作证号
  hireDate: Date;            // 入职日期
  position: Position;        // 职位
  title: Title;              // 职务
  supervisorId?: number;     // 主管 ID
  status: Status;            // 状态
  departmentId: number;      // 部门 ID
  createdAt: Date;           // 创建时间
  updatedAt: Date;           // 更新时间
  deletedAt?: Date;          // 软删除时间
  supervisor?: User;         // 主管
  department: Department;    // 部门
}

export const UserTypeMap = {
  [UserType.Admin]: "管理员",
  [UserType.NormalUser]: "普通用户"
};

export const GenderMap = {
  [Gender.Male]: "男",
  [Gender.NonBi]: "非二元",
  [Gender.Female]: "女"
};

export const EthnicityMap = {
    [Ethnicity.Achang]: "阿昌族",
    [Ethnicity.Bai]: "白族",
    [Ethnicity.Bonan]: "保安族",
    [Ethnicity.Blang]: "布朗族",
    [Ethnicity.Bouyei]: "布依族",
    [Ethnicity.Korean]: "朝鲜族",
    [Ethnicity.Daur]: "达斡尔族",
    [Ethnicity.Dai]: "傣族",
    [Ethnicity.Deang]: "德昂族",
    [Ethnicity.Dongxiang]: "东乡族",
    [Ethnicity.Dong]: "侗族",
    [Ethnicity.Drung]: "独龙族",
    [Ethnicity.Ewenki]: "鄂温克族",
    [Ethnicity.Evenk]: "鄂温克族",
    [Ethnicity.Gaoshan]: "高山族",
    [Ethnicity.Gelao]: "仡佬族",
    [Ethnicity.Hani]: "哈尼族",
    [Ethnicity.Kazak]: "哈萨克族",
    [Ethnicity.Han]: "汉族",
    [Ethnicity.Hezhe]: "赫哲族",
    [Ethnicity.Hui]: "回族",
    [Ethnicity.Jino]: "基诺族",
    [Ethnicity.Jing]: "京族",
    [Ethnicity.Jingpo]: "景颇族",
    [Ethnicity.Kirgiz]: "柯尔克孜族",
    [Ethnicity.Lahu]: "拉祜族",
    [Ethnicity.Li]: "黎族",
    [Ethnicity.Lisu]: "傈僳族",
    [Ethnicity.Lhoba]: "珞巴族",
    [Ethnicity.Manchu]: "满族",
    [Ethnicity.Maonan]: "毛南族",
    [Ethnicity.Menba]: "门巴族",
    [Ethnicity.Mongol]: "蒙古族",
    [Ethnicity.Miao]: "苗族",
    [Ethnicity.Mulam]: "仫佬族",
    [Ethnicity.Naxi]: "纳西族",
    [Ethnicity.Nu]: "怒族",
    [Ethnicity.Pumi]: "普米族",
    [Ethnicity.Qiang]: "羌族",
    [Ethnicity.Sala]: "撒拉族",
    [Ethnicity.She]: "畲族",
    [Ethnicity.Shui]: "水族",
    [Ethnicity.Tajik]: "塔吉克族",
    [Ethnicity.Tatar]: "塔塔尔族",
    [Ethnicity.Tujia]: "土家族",
    [Ethnicity.Tu]: "土族",
    [Ethnicity.Wa]: "佤族",
    [Ethnicity.Uyghur]: "维吾尔族",
    [Ethnicity.Uzbek]: "乌孜别克族",
    [Ethnicity.Xibe]: "锡伯族",
    [Ethnicity.Yao]: "瑶族",
    [Ethnicity.Yi]: "彝族",
    [Ethnicity.Yugur]: "裕固族",
    [Ethnicity.Tibetan]: "藏族",
    [Ethnicity.Zhuang]: "壮族"
};

export const PoliticalStatusMap = {
  [PoliticalStatus.PartyMember]: "党员",
  [PoliticalStatus.YouthLeagueMember]: "团员",
  [PoliticalStatus.Mass]: "群众",
  [PoliticalStatus.Other]: "其他"
};

export const EducationLevelMap = {
  [EducationLevel.Doctor]: "博士",
  [EducationLevel.Master]: "硕士",
  [EducationLevel.Bachelor]: "学士",
  [EducationLevel.Associate]: "副学士",
  [EducationLevel.JuniorCollege]: "大专",
  [EducationLevel.HighSchool]: "高中",
  [EducationLevel.MiddleSchool]: "初中",
  [EducationLevel.PrimarySchool]: "小学",
  [EducationLevel.None]: "无"
};

export const PlaceOfOriginMap = {
    [PlaceOfOrigin.Anhui]: "安徽",
    [PlaceOfOrigin.Beijing]: "北京",
    [PlaceOfOrigin.Chongqing]: "重庆",
    [PlaceOfOrigin.Fujian]: "福建",
    [PlaceOfOrigin.Gansu]: "甘肃",
    [PlaceOfOrigin.Guangdong]: "广东",
    [PlaceOfOrigin.Guangxi]: "广西",
    [PlaceOfOrigin.Guizhou]: "贵州",
    [PlaceOfOrigin.Hainan]: "海南",
    [PlaceOfOrigin.Hebei]: "河北",
    [PlaceOfOrigin.Heilongjiang]: "黑龙江",
    [PlaceOfOrigin.Henan]: "河南",
    [PlaceOfOrigin.Hubei]: "湖北",
    [PlaceOfOrigin.Hunan]: "湖南",
    [PlaceOfOrigin.InnerMongolia]: "内蒙古",
    [PlaceOfOrigin.Jiangsu]: "江苏",
    [PlaceOfOrigin.Jiangxi]: "江西",
    [PlaceOfOrigin.Jilin]: "吉林",
    [PlaceOfOrigin.Liaoning]: "辽宁",
    [PlaceOfOrigin.Ningxia]: "宁夏",
    [PlaceOfOrigin.Qinghai]: "青海",
    [PlaceOfOrigin.Shaanxi]: "陕西",
    [PlaceOfOrigin.Shandong]: "山东",
    [PlaceOfOrigin.Shanghai]: "上海",
    [PlaceOfOrigin.Shanxi]: "山西",
    [PlaceOfOrigin.Sichuan]: "四川",
    [PlaceOfOrigin.Tianjin]: "天津",
    [PlaceOfOrigin.Tibet]: "西藏",
    [PlaceOfOrigin.Xinjiang]: "新疆",
    [PlaceOfOrigin.Yunnan]: "云南",
    [PlaceOfOrigin.Zhejiang]: "浙江"
};

export const PositionMap = {
  [Position.Staff]: "员工",
  [Position.Manager]: "经理",
  [Position.Executive]: "高管"
};

export const TitleMap = {
    [Title.CEO]: "首席执行官",
    [Title.CFO]: "首席财务官",
    [Title.COO]: "首席运营官",
    [Title.CTO]: "首席技术官",
    [Title.CMO]: "首席营销官",
    [Title.CIO]: "首席信息官",
    [Title.CHRO]: "首席人力资源官",
    [Title.CSO]: "首席安全官",
    [Title.CPO]: "首席产品官",
    [Title.VP]: "副总裁",
    [Title.GeneralManager]: "总经理",
    [Title.Director]: "董事",
    [Title.TeamLeader]: "团队领导",
    [Title.Supervisor]: "主管",
    [Title.Consultant]: "顾问",
    [Title.Analyst]: "分析师",
    [Title.Engineer]: "工程师",
    [Title.Developer]: "开发人员",
    [Title.Designer]: "设计师",
    [Title.Architect]: "架构师",
    [Title.Accountant]: "会计",
    [Title.Auditor]: "审计员",
    [Title.Lawyer]: "律师",
    [Title.Paralegal]: "律师助理",
    [Title.Recruiter]: "招聘人员",
    [Title.Trainer]: "培训师",
    [Title.Assistant]: "助理",
    [Title.Secretary]: "秘书",
    [Title.Intern]: "实习生",
    [Title.SalesRepresentative]: "销售代表",
    [Title.MarketingSpecialist]: "市场专员",
    [Title.CustomerServiceRepresentative]: "客户服务代表",
    [Title.BusinessDevelopmentManager]: "业务发展经理",
    [Title.ProjectManager]: "项目经理",
    [Title.ProductManager]: "产品经理",
    [Title.OperationsManager]: "运营经理",
    [Title.HRSpecialist]: "人力资源专员",
    [Title.FinanceManager]: "财务经理",
    [Title.ITSpecialist]: "IT 专家",
    [Title.DataScientist]: "数据科学家",
    [Title.Researcher]: "研究员",
    [Title.ContentCreator]: "内容创作者",
    [Title.Copywriter]: "文案",
    [Title.Editor]: "编辑",
    [Title.PRSpecialist]: "公关专员",
    [Title.LogisticsCoordinator]: "物流协调员",
    [Title.QualityAssuranceSpecialist]: "质量保证专员",
    [Title.SecuritySpecialist]: "安全专家"
};

export const StatusMap = {
  [Status.Active]: "在职",
  [Status.Inactive]: "离职"
};
