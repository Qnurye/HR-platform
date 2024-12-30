package handlers

import (
	"employee-management-system/database"
	"employee-management-system/models"
	"employee-management-system/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetUsers godoc
// @Summary Get all users
// @Description Get all users
// @Tags users
// @Param department_id query int false "Department ID"
// @Produce json
// @Security Bearer
// @Success 200 {array} models.User
// @Router /users [get]
func GetUsers(c *gin.Context) {
	departmentIDParam := c.Query("department_id")
	if departmentIDParam != "" {
		departmentID, err := strconv.Atoi(departmentIDParam)
		if err != nil {
			c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid department ID"})
			return
		}
		users, err := services.GetUsersByDepartmentID(uint(departmentID))
		if err != nil {
			c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch users"})
			return
		}
		c.JSON(http.StatusOK, users)
		return
	}
	users, err := services.GetUsers()
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch users"})
		return
	}

	for i := range users {
		if err := database.DB.Preload("Supervisor").Preload("Department").Find(&users[i]).Error; err != nil {
			c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch related data"})
			return
		}
	}

	c.JSON(http.StatusOK, users)
}

// CreateUser godoc
// @Summary Create a new user
// @Description Create a new user with the input payload
// @Tags users
// @Accept json
// @Produce json
// @Security Bearer
// @Param user body models.User true "User Data"
// @Success 201 {object} models.User
// @Failure 400 {object} ErrorResponse
// @Router /users [post]
func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid request"})
		return
	}

	if _, err := services.CreateUser(&user); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, user)
}

// GetUser godoc
// @Summary Get a user by ID
// @Description Get details of a user by ID
// @Tags users
// @Produce json
// @Security Bearer
// @Param id path int true "User ID"
// @Success 200 {object} models.User
// @Failure 404 {object} ErrorResponse
// @Router /users/{id} [get]
func GetUser(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid user ID"})
		return
	}

	user, err := services.GetUserByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "User not found"})
		return
	}

	if err := database.DB.Preload("Supervisor").Preload("Department").Find(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch related data"})
		return
	}

	requestingUser, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Message: "Unauthorized"})
		return
	}

	if requestingUser.(*models.User).ID != user.ID && !(requestingUser.(*models.User).UserType == models.Admin) {
		user.IDNumber = "***"
		user.PhoneNumber = "***"
		user.ArchiveLocation = "***"
		user.ResidenceLocation = "***"
	}

	c.JSON(http.StatusOK, user)
}

// GetUserByWorkID godoc
// @Summary Get user by work ID
// @Description Get a user by their work ID number
// @Tags users
// @Produce json
// @Security Bearer
// @Param workId path string true "Work ID Number"
// @Success 200 {object} models.User
// @Failure 404 {object} ErrorResponse
// @Router /users/work-id/{workId} [get]
func GetUserByWorkID(c *gin.Context) {
	workID := c.Param("workId")
	user, err := services.GetUserByWorkIDNumber(workID)
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "User not found"})
		return
	}
	c.JSON(http.StatusOK, user)
}

// UpdateUser godoc
// @Summary Update a user by ID
// @Description Update details of a user by ID
// @Tags users
// @Accept json
// @Produce json
// @Security Bearer
// @Param id path int true "User ID"
// @Param user body models.User true "User Data"
// @Success 200 {object} models.User
// @Failure 400 {object} ErrorResponse
// @Failure 404 {object} ErrorResponse
// @Router /users/{id} [put]
func UpdateUser(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid user ID"})
		return
	}
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid request"})
		return
	}

	updatedUser, err := services.UpdateUser(uint(id), &user)
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "User not found"})
		return
	}

	c.JSON(http.StatusOK, updatedUser)
}

// DeleteUser godoc
// @Summary Delete a user by ID
// @Description Delete a user by ID
// @Tags users
// @Produce json
// @Security Bearer
// @Param id path int true "User ID"
// @Success 204
// @Failure 404 {object} ErrorResponse
// @Router /users/{id} [delete]
func DeleteUser(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid user ID"})
		return
	}
	if err := services.DeleteUser(uint(id)); err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "User not found"})
		return
	}

	c.Status(http.StatusNoContent)
}
