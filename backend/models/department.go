package models

import (
	"time"

	"gorm.io/gorm"
)

type Department struct {
	ID                 uint           `gorm:"primaryKey" json:"id"`        // 部门ID
	Name               string         `gorm:"unique" json:"name"`          // 部门名称
	FunctionCode       string         `gorm:"unique" json:"function_code"` // 部门职能编号
	ParentDepartmentID *uint          `json:"parent_department_id"`        // 上级部门ID
	CreatedAt          time.Time      `json:"created_at"`                  // 创建时间
	UpdatedAt          time.Time      `json:"updated_at"`                  // 更新时间
	DeletedAt          gorm.DeletedAt `gorm:"index" json:"-"`              // 软删除时间
	ParentDepartment   *Department    `gorm:"foreignKey:ParentDepartmentID" json:"parent_department,omitempty"`
}
