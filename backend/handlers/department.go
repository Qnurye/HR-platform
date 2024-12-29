package handlers

import (
	"employee-management-system/models"
	"employee-management-system/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetDepartments godoc
// @Summary Get all departments
// @Description Get all departments
// @Tags departments
// @Produce json
// @Security Bearer
// @Success 200 {array} models.Department
// @Router /departments [get]
func GetDepartments(c *gin.Context) {
	departments, err := services.GetDepartments()
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch departments"})
		return
	}

	c.JSON(http.StatusOK, departments)
}

// CreateDepartment godoc
// @Summary Create a new department
// @Description Create a new department with the input payload
// @Tags departments
// @Accept json
// @Produce json
// @Security Bearer
// @Param department body models.Department true "Department Data"
// @Success 201 {object} models.Department
// @Failure 400 {object} ErrorResponse
// @Router /departments [post]
func CreateDepartment(c *gin.Context) {
	var department models.Department
	if err := c.BindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid request"})
		return
	}

	_, err := services.CreateDepartment(&department)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to create department"})
		return
	}

	c.JSON(http.StatusCreated, department)
}

// GetDepartment godoc
// @Summary Get a department by ID
// @Description Get details of a department by ID
// @Tags departments
// @Produce json
// @Security Bearer
// @Param id path int true "Department ID"
// @Success 200 {object} models.Department
// @Failure 404 {object} ErrorResponse
// @Router /departments/{id} [get]
func GetDepartment(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid department ID"})
		return
	}

	department, err := services.GetDepartmentByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "Department not found"})
		return
	}

	c.JSON(http.StatusOK, department)
}

// UpdateDepartment godoc
// @Summary Update a department by ID
// @Description Update details of a department by ID
// @Tags departments
// @Accept json
// @Produce json
// @Security Bearer
// @Param id path int true "Department ID"
// @Param department body models.Department true "Department Data"
// @Success 200 {object} models.Department
// @Failure 400 {object} ErrorResponse
// @Failure 404 {object} ErrorResponse
// @Router /departments/{id} [put]
func UpdateDepartment(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid department ID"})
		return
	}
	var department models.Department
	if err := c.BindJSON(&department); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid request"})
		return
	}

	updatedDepartment, err := services.UpdateDepartment(uint(id), &department)
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "Department not found"})
		return
	}

	c.JSON(http.StatusOK, updatedDepartment)
}

// DeleteDepartment godoc
// @Summary Delete a department by ID
// @Description Delete a department by ID
// @Tags departments
// @Produce json
// @Security Bearer
// @Param id path int true "Department ID"
// @Success 204
// @Failure 404 {object} ErrorResponse
// @Router /departments/{id} [delete]
func DeleteDepartment(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid department ID"})
		return
	}
	if err := services.DeleteDepartment(uint(id)); err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "Department not found"})
		return
	}

	c.Status(http.StatusNoContent)
}
