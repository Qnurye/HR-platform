package services

import (
	"employee-management-system/database"
	"employee-management-system/models"
	"errors"

	"gorm.io/gorm"
)

func GetApprovals() ([]models.Approval, error) {
	var approvals []models.Approval
	if err := database.DB.Preload("Employee").Preload("Approver").Find(&approvals).Error; err != nil {
		return nil, err
	}
	return approvals, nil
}

func GetApprovalByID(id uint) (*models.Approval, error) {
	var approval models.Approval
	if err := database.DB.Preload("Employee").Preload("Approver").First(&approval, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		return nil, err
	}
	return &approval, nil
}

func CreateApproval(approval *models.Approval) error {
	if err := database.DB.Create(approval).Error; err != nil {
		return err
	}
	return nil
}

func UpdateApproval(id uint, updatedApproval *models.Approval) (*models.Approval, error) {
	var approval models.Approval
	if err := database.DB.First(&approval, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		return nil, err
	}

	if err := database.DB.Model(&approval).Updates(updatedApproval).Error; err != nil {
		return nil, err
	}

	return &approval, nil
}

func DeleteApproval(id uint) error {
	if err := database.DB.Delete(&models.Approval{}, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}
		return err
	}
	return nil
}

func GetApprovalsByUserID(userID uint) ([]models.Approval, error) {
	var approvals []models.Approval
	if err := database.DB.Where("employee_id = ?", userID).Preload("Employee").Preload("Approver").Find(&approvals).Error; err != nil {
		return nil, err
	}
	return approvals, nil
}

func GetPendingApprovals(userID uint) ([]models.Approval, error) {
	var approvals []models.Approval
	if err := database.DB.Where(
		"status = ? and approver_id = ?",
		models.Active, userID).Preload("Employee").Preload("Approver").Find(&approvals).Error; err != nil {
		return nil, err
	}
	return approvals, nil
}
