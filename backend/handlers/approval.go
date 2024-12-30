package handlers

import (
	"employee-management-system/models"
	"employee-management-system/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// GetApprovals godoc
// @Summary Get all approvals
// @Description Get all approvals
// @Tags approvals
// @Produce json
// @Security Bearer
// @Success 200 {array} models.Approval
// @Router /approvals [get]
func GetApprovals(c *gin.Context) {
	approvals, err := services.GetApprovals()
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch approvals"})
		return
	}

	c.JSON(http.StatusOK, approvals)
}

// CreateApproval godoc
// @Summary Create a new approval
// @Description Create a new approval with the input payload
// @Tags approvals
// @Accept json
// @Produce json
// @Security Bearer
// @Param approval body models.Approval true "Approval Data"
// @Success 201 {object} models.Approval
// @Failure 400 {object} ErrorResponse
// @Router /approvals [post]
func CreateApproval(c *gin.Context) {
	var approval models.Approval
	if err := c.BindJSON(&approval); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid request"})
		return
	}

	if err := services.CreateApproval(&approval); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to create approval"})
		return
	}

	c.JSON(http.StatusCreated, approval)
}

// GetApproval godoc
// @Summary Get an approval by ID
// @Description Get details of an approval by ID
// @Tags approvals
// @Produce json
// @Security Bearer
// @Param id path int true "Approval ID"
// @Success 200 {object} models.Approval
// @Failure 404 {object} ErrorResponse
// @Router /approvals/{id} [get]
func GetApproval(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid approval ID"})
		return
	}

	approval, err := services.GetApprovalByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "Approval not found"})
		return
	}

	c.JSON(http.StatusOK, approval)
}

// UpdateApproval godoc
// @Summary Update an approval by ID
// @Description Update details of an approval by ID
// @Tags approvals
// @Accept json
// @Produce json
// @Security Bearer
// @Param id path int true "Approval ID"
// @Param approval body models.Approval true "Approval Data"
// @Success 200 {object} models.Approval
// @Failure 400 {object} ErrorResponse
// @Failure 404 {object} ErrorResponse
// @Router /approvals/{id} [put]
func UpdateApproval(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid approval ID"})
		return
	}
	var approval models.Approval
	if err := c.BindJSON(&approval); err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid request"})
		return
	}

	updatedApproval, err := services.UpdateApproval(uint(id), &approval)
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "Approval not found"})
		return
	}

	c.JSON(http.StatusOK, updatedApproval)
}

// DeleteApproval godoc
// @Summary Delete an approval by ID
// @Description Delete an approval by ID
// @Tags approvals
// @Produce json
// @Security Bearer
// @Param id path int true "Approval ID"
// @Success 204
// @Failure 404 {object} ErrorResponse
// @Router /approvals/{id} [delete]
func DeleteApproval(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ErrorResponse{Message: "Invalid approval ID"})
		return
	}
	if err := services.DeleteApproval(uint(id)); err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "Approval not found"})
		return
	}

	c.Status(http.StatusNoContent)
}

// GetMyApprovals godoc
// @Summary Get approvals assigned to the current user
// @Description Get approvals assigned to the current user
// @Tags approvals
// @Produce json
// @Security Bearer
// @Success 200 {array} models.Approval
// @Router /approvals/my [get]
func GetMyApprovals(c *gin.Context) {
	requestingUser, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch user"})
		return
	}
	user, ok := requestingUser.(*models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch user"})
		return
	}
	approvals, err := services.GetApprovalsByUserID(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch approvals"})
		return
	}
	c.JSON(http.StatusOK, approvals)
}

func GetPendingApprovals(c *gin.Context) {
	requestingUser, exists := c.Get("user")
	if !exists {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch user"})
		return
	}
	user, ok := requestingUser.(*models.User)
	if !ok {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch user"})
		return
	}
	approvals, err := services.GetPendingApprovals(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{Message: "Failed to fetch approvals"})
		return
	}
	c.JSON(http.StatusOK, approvals)
}
