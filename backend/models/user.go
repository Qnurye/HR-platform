package models

import (
	"time"

	"gorm.io/gorm"
)

type UserType int

const (
	Admin      UserType = 1
	NormalUser UserType = 2
)

type Gender int

const (
	Male Gender = iota - 1
	NonBi
	Female
)

type Ethnicity int

const (
	Achang Ethnicity = iota
	Bai
	Bonan
	Blang
	Bouyei
	Korean
	Daur
	Dai
	Deang
	Dongxiang
	Dong
	Drung
	Ewenki
	Evenk
	Gaoshan
	Gelao
	Hani
	Kazak
	Han
	Hezhe
	Hui
	Jino
	Jing
	Jingpo
	Kirgiz
	Lahu
	Li
	Lisu
	Lhoba
	Manchu
	Maonan
	Menba
	Mongol
	Miao
	Mulam
	Naxi
	Nu
	Pumi
	Qiang
	Sala
	She
	Shui
	Tajik
	Tatar
	Tujia
	Tu
	Wa
	Uyghur
	Uzbek
	Xibe
	Yao
	Yi
	Yugur
	Tibetan
	Zhuang
)

type PoliticalStatus int

const (
	PartyMember PoliticalStatus = iota
	YouthLeagueMember
	Mass
	Other
)

type EducationLevel int

const (
	Doctor EducationLevel = iota
	Master
	Bachelor
	Associate
	JuniorCollege
	HighSchool
	MiddleSchool
	PrimarySchool
	None
)

type PlaceOfOrigin int

const (
	Anhui = iota
	Beijing
	Chongqing
	Fujian
	Gansu
	Guangdong
	Guangxi
	Guizhou
	Hainan
	Hebei
	Heilongjiang
	Henan
	Hubei
	Hunan
	InnerMongolia
	Jiangsu
	Jiangxi
	Jilin
	Liaoning
	Ningxia
	Qinghai
	Shaanxi
	Shandong
	Shanghai
	Shanxi
	Sichuan
	Tianjin
	Tibet
	Xinjiang
	Yunnan
	Zhejiang
)

type Position int

const (
	Staff Position = iota
	Manager
	Executive
)

type Title int

const (
	CEO Title = iota
	CFO
	COO
	CTO
	CMO
	CIO
	CHRO
	CSO
	CPO
	VP
	GeneralManager
	Director
	TeamLeader
	Supervisor
	Consultant
	Analyst
	Engineer
	Developer
	Designer
	Architect
	Accountant
	Auditor
	Lawyer
	Paralegal
	Recruiter
	Trainer
	Assistant
	Secretary
	Intern
	SalesRepresentative
	MarketingSpecialist
	CustomerServiceRepresentative
	BusinessDevelopmentManager
	ProjectManager
	ProductManager
	OperationsManager
	HRSpecialist
	FinanceManager
	ITSpecialist
	DataScientist
	Researcher
	ContentCreator
	Copywriter
	Editor
	PRSpecialist
	LogisticsCoordinator
	QualityAssuranceSpecialist
	SecuritySpecialist
)

type Status int

const (
	Active Status = iota
	Inactive
)

type User struct {
	ID                uint            `gorm:"primaryKey" json:"id"`                // 员工 ID
	Username          string          `json:"username"`                            // 用户名
	Password          string          `json:"password"`                            // 密码哈希值
	UserType          UserType        `gorm:"default:2" json:"user_type"`          // 用户类型
	Name              string          `json:"name"`                                // 姓名
	Gender            Gender          `gorm:"default:0" json:"gender"`             // 性别
	Photo             []byte          `json:"photo"`                               // 照片
	Ethnicity         Ethnicity       `gorm:"default:0" json:"ethnicity"`          // 民族
	Birthday          time.Time       `json:"birthday"`                            // 生日
	PoliticalStatus   PoliticalStatus `gorm:"default:2" json:"political_status"`   // 政治面貌
	EducationLevel    EducationLevel  `gorm:"default:2" json:"education_level"`    // 学历
	MaritalStatus     bool            `gorm:"default:false" json:"marital_status"` // 婚姻状况
	PlaceOfOrigin     PlaceOfOrigin   `gorm:"default:0" json:"place_of_origin"`    // 籍贯
	IDNumber          string          `json:"id_number"`                           // 身份证号
	PhoneNumber       string          `json:"phone_number"`                        // 电话号码
	ArchiveLocation   string          `json:"archive_location"`                    // 档案存放地
	ResidenceLocation string          `json:"residence_location"`                  // 户口所在地
	WorkIDNumber      string          `json:"work_id_number"`                      // 工作证号
	HireDate          time.Time       `json:"hire_date"`                           // 入职日期
	Position          Position        `gorm:"default:0" json:"position"`           // 职位
	Title             Title           `gorm:"default:0" json:"title"`              // 职务
	SupervisorID      *uint           `json:"supervisor_id"`                       // 主管 ID
	Status            Status          `gorm:"default:0" json:"status"`             // 状态
	DepartmentID      uint            `json:"department_id"`                       // 部门 ID
	CreatedAt         time.Time       `json:"created_at"`                          // 创建时间
	UpdatedAt         time.Time       `json:"updated_at"`                          // 更新时间
	DeletedAt         gorm.DeletedAt  `gorm:"index" json:"-"`                      // 软删除时间
	Supervisor        *User           `gorm:"foreignKey:SupervisorID"`
	Department        Department      `gorm:"foreignKey:DepartmentID"`
}
