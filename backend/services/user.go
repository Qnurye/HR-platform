package services

import (
	"employee-management-system/config"
	"employee-management-system/database"
	"employee-management-system/models"
	"errors"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func GetUsers() ([]models.User, error) {
	var users []models.User
	if err := database.DB.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func GetUserByID(id uint) (*models.User, error) {
	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		return nil, errors.New("user not found")
	}
	return &user, nil
}

func GetUserByUsername(username string) (*models.User, error) {
	var user models.User
	if err := database.DB.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, errors.New("user not found")
	}
	return &user, nil
}

func CreateUser(user *models.User) error {
	if err := database.DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

func UpdateUser(id uint, user *models.User) (*models.User, error) {
	var existingUser models.User
	if err := database.DB.First(&existingUser, id).Error; err != nil {
		return nil, errors.New("user not found")
	}

	if err := database.DB.Model(&existingUser).Updates(user).Error; err != nil {
		return nil, err
	}
	return &existingUser, nil
}

func DeleteUser(id uint) error {
	if err := database.DB.Delete(&models.User{}, id).Error; err != nil {
		return err
	}
	return nil
}

func AuthenticateUser(username, password string) (*models.User, error) {
	var user models.User
	if err := database.DB.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, errors.New("user not found")
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, errors.New("invalid password")
	}
	return &user, nil
}

func CreateSuperUser() {
	username := config.AppConfig.SuperUser.Username

	_, err := GetUserByUsername(username)
	if err == nil {
		return
	}

	log.Println("Creating default super user")
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(config.AppConfig.SuperUser.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal("Failed to hash password:", err)
	}

	department, err := GetOrCreateSuperUserDepartment()
	if err != nil {
		log.Fatal("Failed to create super user department:", err)
	}

	superUser := &models.User{
		Username:     username,
		Password:     string(hashedPassword),
		UserType:     models.Admin,
		Name:         "罗文杰",
		DepartmentID: department.ID,
	}

	err = CreateUser(superUser)
	if err != nil {
		log.Fatal("Failed to create super user:", err)
	}
}