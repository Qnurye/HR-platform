package main

import (
	"employee-management-system/config"
	"employee-management-system/database"
	"employee-management-system/models"
	"employee-management-system/services"
	"golang.org/x/crypto/bcrypt"
	"time"
)

func main() {
	config.LoadConfig()
	database.ConnectDB()

	var CEO, _ = services.CreateDepartment(&models.Department{
		Name:               "总经理办公室",
		FunctionCode:       "CEO",
		ParentDepartmentID: nil,
	})

	var HR, _ = services.CreateDepartment(&models.Department{
		Name:             "人力资源部",
		FunctionCode:     "HR",
		ParentDepartment: CEO,
	})

	var HrRecruit, _ = services.CreateDepartment(&models.Department{
		Name:             "招聘团队",
		FunctionCode:     "HR-RECRUIT",
		ParentDepartment: HR,
	})

	var HrEr, _ = services.CreateDepartment(&models.Department{
		Name:             "员工关系团队",
		FunctionCode:     "HR-ER",
		ParentDepartment: HR,
	})

	var Finance, _ = services.CreateDepartment(&models.Department{
		Name:             "财务部",
		FunctionCode:     "FIN",
		ParentDepartment: CEO,
	})

	var FinACC, _ = services.CreateDepartment(&models.Department{
		Name:             "会计团队",
		FunctionCode:     "FIN-ACC",
		ParentDepartment: Finance,
	})

	var FinAnanlysis, _ = services.CreateDepartment(&models.Department{
		Name:             "财务分析团队",
		FunctionCode:     "FIN-ANALYSIS",
		ParentDepartment: Finance,
	})

	var Tech, _ = services.CreateDepartment(&models.Department{
		Name:             "技术部",
		FunctionCode:     "TECH",
		ParentDepartment: CEO,
	})

	var Dev, _ = services.CreateDepartment(&models.Department{
		Name:             "开发团队",
		FunctionCode:     "DEV",
		ParentDepartment: Tech,
	})

	var DevFrontend, _ = services.CreateDepartment(&models.Department{
		Name:             "前端开发",
		FunctionCode:     "DEV-FRONTEND",
		ParentDepartment: Dev,
	})

	var DevBackend, _ = services.CreateDepartment(&models.Department{
		Name:             "后端开发",
		FunctionCode:     "DEV-BACKEND",
		ParentDepartment: Dev,
	})

	var QA, _ = services.CreateDepartment(&models.Department{
		Name:             "测试团队",
		FunctionCode:     "QA",
		ParentDepartment: Tech,
	})

	var Marketing, _ = services.CreateDepartment(&models.Department{
		Name:             "市场部",
		FunctionCode:     "MKT",
		ParentDepartment: CEO,
	})

	var MktBrand, _ = services.CreateDepartment(&models.Department{
		Name:             "品牌营销团队",
		FunctionCode:     "MKT-BRAND",
		ParentDepartment: Marketing,
	})

	var MktPr, _ = services.CreateDepartment(&models.Department{
		Name:             "公关团队",
		FunctionCode:     "MKT-PR",
		ParentDepartment: Marketing,
	})

	var Sales, _ = services.CreateDepartment(&models.Department{
		Name:             "销售部",
		FunctionCode:     "SALES",
		ParentDepartment: CEO,
	})

	var SalesDome, _ = services.CreateDepartment(&models.Department{
		Name:             "国内销售团队",
		FunctionCode:     "SALES-DOMESTIC",
		ParentDepartment: Sales,
	})

	var SalesIntl, _ = services.CreateDepartment(&models.Department{
		Name:             "国际销售团队",
		FunctionCode:     "SALES-INTERNATIONAL",
		ParentDepartment: Sales,
	})

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password"), bcrypt.DefaultCost)

	var Zhangsan, _ = services.CreateUser(&models.User{
		Username:          "zhangsan",
		Password:          string(hashedPassword),
		UserType:          models.Admin,
		Name:              "张三",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2000, 9, 25, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.None,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Guizhou,
		IDNumber:          "5222222222222222222222",
		PhoneNumber:       "19999999999",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "C0001",
		HireDate:          time.Date(2000, 9, 25, 0, 0, 0, 0, time.Local),
		Position:          models.Executive,
		Title:             models.CEO,
		Status:            models.Active,
		Supervisor:        nil,
		Department:        *CEO,
	})

	var Lisi, _ = services.CreateUser(&models.User{
		Username:          "lisi",
		Password:          "",
		UserType:          models.Admin,
		Name:              "李四",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2002, 7, 15, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.None,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Beijing,
		IDNumber:          "1222222222222222222222",
		PhoneNumber:       "19999992999",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "C0002",
		HireDate:          time.Date(2000, 9, 25, 0, 0, 0, 0, time.Local),
		Position:          models.Executive,
		Title:             models.CHRO,
		Status:            models.Active,
		Supervisor:        Zhangsan,
		Department:        *HR,
	})

	var Wangwu, _ = services.CreateUser(&models.User{
		Username:          "wangwu",
		Password:          string(hashedPassword),
		UserType:          models.NormalUser,
		Name:              "王五",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1995, 5, 20, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Shanghai,
		IDNumber:          "3122222222222222222222",
		PhoneNumber:       "18888888888",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "上海市",
		WorkIDNumber:      "E0001",
		HireDate:          time.Date(2018, 3, 15, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.FinanceManager,
		Status:            models.Active,
		Supervisor:        Lisi,
		Department:        *Finance,
	})

	var Zhaoliu, _ = services.CreateUser(&models.User{
		Username:          "zhaoliu",
		Password:          string(hashedPassword),
		UserType:          models.NormalUser,
		Name:              "赵六",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1990, 12, 10, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Guangdong,
		IDNumber:          "4422222222222222222222",
		PhoneNumber:       "17777777777",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "深圳市",
		WorkIDNumber:      "E0002",
		HireDate:          time.Date(2015, 6, 1, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.Developer,
		Status:            models.Active,
		Supervisor:        Wangwu,
		Department:        *DevBackend,
	})

	var User1, _ = services.CreateUser(&models.User{
		Username:          "user1",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户一",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1991, 1, 1, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Beijing,
		IDNumber:          "1111111111111111111111",
		PhoneNumber:       "16666666666",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "E0003",
		HireDate:          time.Date(2019, 1, 1, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.MarketingSpecialist,
		Status:            models.Active,
		Supervisor:        Zhaoliu,
		Department:        *Marketing,
	})

	var User2, _ = services.CreateUser(&models.User{
		Username:          "user2",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户二",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1992, 2, 2, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Shanghai,
		IDNumber:          "2222222222222222222222",
		PhoneNumber:       "15555555555",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "上海市",
		WorkIDNumber:      "E0004",
		HireDate:          time.Date(2018, 2, 2, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.ProjectManager,
		Status:            models.Active,
		Supervisor:        User1,
		Department:        *Tech,
	})

	var User3, _ = services.CreateUser(&models.User{
		Username:          "user3",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户三",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1993, 3, 3, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Guangdong,
		IDNumber:          "3333333333333333333333",
		PhoneNumber:       "14444444444",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "广州市",
		WorkIDNumber:      "E0005",
		HireDate:          time.Date(2017, 3, 3, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.CustomerServiceRepresentative,
		Status:            models.Active,
		Supervisor:        User2,
		Department:        *Sales,
	})

	var User4, _ = services.CreateUser(&models.User{
		Username:          "user4",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户四",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1994, 4, 4, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Beijing,
		IDNumber:          "4444444444444444444444",
		PhoneNumber:       "13333333333",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "E0006",
		HireDate:          time.Date(2016, 4, 4, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.ProductManager,
		Status:            models.Active,
		Supervisor:        User3,
		Department:        *Tech,
	})

	var User5, _ = services.CreateUser(&models.User{
		Username:          "user5",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户五",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1995, 5, 5, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Shanghai,
		IDNumber:          "5555555555555555555555",
		PhoneNumber:       "12222222222",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "上海市",
		WorkIDNumber:      "E0007",
		HireDate:          time.Date(2015, 5, 5, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.Engineer,
		Status:            models.Active,
		Supervisor:        User4,
		Department:        *DevFrontend,
	})

	var User6, _ = services.CreateUser(&models.User{
		Username:          "user6",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户六",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1996, 6, 6, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Guangdong,
		IDNumber:          "6666666666666666666666",
		PhoneNumber:       "11111111111",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "广州市",
		WorkIDNumber:      "E0008",
		HireDate:          time.Date(2014, 6, 6, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.OperationsManager,
		Status:            models.Active,
		Supervisor:        User5,
		Department:        *HrRecruit,
	})

	var User7, _ = services.CreateUser(&models.User{
		Username:          "user7",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户七",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1997, 7, 7, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Beijing,
		IDNumber:          "7777777777777777777777",
		PhoneNumber:       "10000000000",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "E0009",
		HireDate:          time.Date(2013, 7, 7, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.Designer,
		Status:            models.Active,
		Supervisor:        User6,
		Department:        *MktBrand,
	})

	var User8, _ = services.CreateUser(&models.User{
		Username:          "user8",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户八",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1998, 8, 8, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Shanghai,
		IDNumber:          "8888888888888888888888",
		PhoneNumber:       "19999999998",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "上海市",
		WorkIDNumber:      "E0010",
		HireDate:          time.Date(2012, 8, 8, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.Analyst,
		Status:            models.Active,
		Supervisor:        User7,
		Department:        *FinACC,
	})

	var User9, _ = services.CreateUser(&models.User{
		Username:          "user9",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户九",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(1999, 9, 9, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Guangdong,
		IDNumber:          "9999999999999999999999",
		PhoneNumber:       "18888888888",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "广州市",
		WorkIDNumber:      "E0011",
		HireDate:          time.Date(2011, 9, 9, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.Editor,
		Status:            models.Active,
		Supervisor:        User8,
		Department:        *Marketing,
	})

	var User10, _ = services.CreateUser(&models.User{
		Username:          "user10",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2000, 10, 10, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Beijing,
		IDNumber:          "1010101010101010101010",
		PhoneNumber:       "17777777777",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "E0012",
		HireDate:          time.Date(2010, 10, 10, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.Consultant,
		Status:            models.Active,
		Supervisor:        User9,
		Department:        *HrRecruit,
	})

	var User11, _ = services.CreateUser(&models.User{
		Username:          "user11",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十一",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2001, 11, 11, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Shanghai,
		IDNumber:          "1111111111111111111111",
		PhoneNumber:       "16666666666",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "上海市",
		WorkIDNumber:      "E0013",
		HireDate:          time.Date(2009, 11, 11, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.Trainer,
		Status:            models.Active,
		Supervisor:        User10,
		Department:        *HrEr,
	})

	var User12, _ = services.CreateUser(&models.User{
		Username:          "user12",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十二",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2002, 12, 12, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Guangdong,
		IDNumber:          "1212121212121212121212",
		PhoneNumber:       "15555555555",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "广州市",
		WorkIDNumber:      "E0014",
		HireDate:          time.Date(2008, 12, 12, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.ITSpecialist,
		Status:            models.Active,
		Supervisor:        User11,
		Department:        *QA,
	})

	var User13, _ = services.CreateUser(&models.User{
		Username:          "user13",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十三",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2003, 1, 13, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Beijing,
		IDNumber:          "1313131313131313131313",
		PhoneNumber:       "14444444444",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "E0015",
		HireDate:          time.Date(2007, 1, 13, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.DataScientist,
		Status:            models.Active,
		Supervisor:        User12,
		Department:        *SalesDome,
	})

	var User14, _ = services.CreateUser(&models.User{
		Username:          "user14",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十四",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2004, 2, 14, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Shanghai,
		IDNumber:          "1414141414141414141414",
		PhoneNumber:       "13333333333",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "上海市",
		WorkIDNumber:      "E0016",
		HireDate:          time.Date(2006, 2, 14, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.Researcher,
		Status:            models.Active,
		Supervisor:        User13,
		Department:        *Tech,
	})

	var User15, _ = services.CreateUser(&models.User{
		Username:          "user15",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十五",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2005, 3, 15, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Beijing,
		IDNumber:          "1515151515151515151515",
		PhoneNumber:       "12222222222",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "E0017",
		HireDate:          time.Date(2005, 3, 15, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.Engineer,
		Status:            models.Active,
		Supervisor:        User14,
		Department:        *DevFrontend,
	})

	var User16, _ = services.CreateUser(&models.User{
		Username:          "user16",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十六",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2006, 4, 16, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Guangdong,
		IDNumber:          "1616161616161616161616",
		PhoneNumber:       "11111111111",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "广州市",
		WorkIDNumber:      "E0018",
		HireDate:          time.Date(2004, 4, 16, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.OperationsManager,
		Status:            models.Active,
		Supervisor:        User15,
		Department:        *SalesIntl,
	})

	var User17, _ = services.CreateUser(&models.User{
		Username:          "user17",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十七",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2007, 5, 17, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Beijing,
		IDNumber:          "1717171717171717171717",
		PhoneNumber:       "10000000000",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "E0019",
		HireDate:          time.Date(2003, 5, 17, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.Designer,
		Status:            models.Active,
		Supervisor:        User16,
		Department:        *MktPr,
	})

	var User18, _ = services.CreateUser(&models.User{
		Username:          "user18",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十八",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2008, 6, 18, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Shanghai,
		IDNumber:          "1818181818181818181818",
		PhoneNumber:       "19999999998",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "上海市",
		WorkIDNumber:      "E0020",
		HireDate:          time.Date(2002, 6, 18, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.Analyst,
		Status:            models.Active,
		Supervisor:        User17,
		Department:        *FinAnanlysis,
	})

	var User19, _ = services.CreateUser(&models.User{
		Username:          "user19",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户十九",
		Gender:            models.Female,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2009, 7, 19, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Bachelor,
		MaritalStatus:     false,
		PlaceOfOrigin:     models.Guangdong,
		IDNumber:          "1919191919191919191919",
		PhoneNumber:       "18888888888",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "广州市",
		WorkIDNumber:      "E0021",
		HireDate:          time.Date(2001, 7, 19, 0, 0, 0, 0, time.Local),
		Position:          models.Staff,
		Title:             models.Editor,
		Status:            models.Active,
		Supervisor:        User18,
		Department:        *Marketing,
	})

	var _, _ = services.CreateUser(&models.User{
		Username:          "user20",
		Password:          "",
		UserType:          models.NormalUser,
		Name:              "用户二十",
		Gender:            models.Male,
		Photo:             nil,
		Ethnicity:         models.Han,
		Birthday:          time.Date(2010, 8, 20, 0, 0, 0, 0, time.Local),
		PoliticalStatus:   models.Mass,
		EducationLevel:    models.Master,
		MaritalStatus:     true,
		PlaceOfOrigin:     models.Beijing,
		IDNumber:          "2020202020202020202020",
		PhoneNumber:       "17777777777",
		ArchiveLocation:   "北京市做大做强科技有限公司",
		ResidenceLocation: "北京市",
		WorkIDNumber:      "E0022",
		HireDate:          time.Date(2000, 8, 20, 0, 0, 0, 0, time.Local),
		Position:          models.Manager,
		Title:             models.Consultant,
		Status:            models.Active,
		Supervisor:        User19,
		Department:        *HR,
	})
}
