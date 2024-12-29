package services

import (
	"employee-management-system/database"
	"employee-management-system/models"
	"errors"
	"log"

	"gorm.io/gorm"
)

func GetDepartments() ([]models.Department, error) {
	var departments []models.Department
	if err := database.DB.Find(&departments).Error; err != nil {
		return nil, err
	}
	return departments, nil
}

func GetDepartmentByID(id uint) (*models.Department, error) {
	var department models.Department
	if err := database.DB.First(&department, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		return nil, err
	}
	return &department, nil
}

func GetDepartmentByName(name string) (*models.Department, error) {
	var department models.Department
	if err := database.DB.Where("name = ?", name).First(&department).Error; err != nil {
		return nil, errors.New("department not found")
	}
	return &department, nil
}

func GetDepartmentByFunctionCode(functionCode string) (*models.Department, error) {
	var user models.Department
	if err := database.DB.Where("function_code = ?", functionCode).First(&user).Error; err != nil {
		return nil, errors.New("user not found")
	}
	return &user, nil
}

func CreateDepartment(department *models.Department) (*models.Department, error) {
	if err := database.DB.Create(department).Error; err != nil {
		return nil, err
	}
	return department, nil
}

func UpdateDepartment(id uint, updatedDepartment *models.Department) (*models.Department, error) {
	var department models.Department
	if err := database.DB.First(&department, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, err
		}
		return nil, err
	}

	if err := database.DB.Model(&department).Updates(updatedDepartment).Error; err != nil {
		return nil, err
	}

	return &department, nil
}

func DeleteDepartment(id uint) error {
	if err := database.DB.Delete(&models.Department{}, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return err
		}
		return err
	}
	return nil
}

func GetOrCreateSuperUserDepartment() (*models.Department, error) {
	name := "System"
	functionCode := "0000"

	oldDepartment, err := GetDepartmentByName(name)
	if err == nil {
		return oldDepartment, nil
	}

	department := models.Department{
		Name:               name,
		FunctionCode:       functionCode,
		ParentDepartmentID: nil,
	}

	log.Println("Creating default super user department")
	newDepartment, err := CreateDepartment(&department)
	if err != nil {
		return nil, err
	}

	return newDepartment, nil
}
