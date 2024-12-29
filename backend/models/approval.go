package models

import (
	"time"

	"gorm.io/gorm"
)

type ApprovalType int

const (
	General ApprovalType = iota
	Leave
	Reimbursement
)

type Approval struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	EmployeeID   uint           `json:"employee_id"`
	ApprovalType ApprovalType   `gorm:"default:0" json:"approval_type"`
	Status       Status         `gorm:"default:0" json:"status"`
	RequestDate  time.Time      `json:"request_date"`
	ApprovalDate *time.Time     `json:"approval_date,omitempty"`
	ApproverID   *uint          `json:"approver_id,omitempty"`
	Comments     string         `json:"comments,omitempty"`
	CreatedAt    time.Time      `json:"created_at"`     // 创建时间
	UpdatedAt    time.Time      `json:"updated_at"`     // 更新时间
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"-"` // 软删除时间
	Employee     User           `gorm:"foreignKey:EmployeeID"`
	Approver     *User          `gorm:"foreignKey:ApproverID"`
}
