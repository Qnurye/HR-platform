package routes

import (
	"employee-management-system/handlers"
	"employee-management-system/middleware"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	docs "employee-management-system/docs"

	"github.com/gin-gonic/gin"
)

func SetupRouter(r *gin.Engine, jwtSecret []byte) *gin.Engine {
	docs.SwaggerInfo.BasePath = "/api/v1"

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})

	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	api := r.Group("/api/v1")

	auth := api.Group("/auth")
	auth.POST("/login", handlers.Login)
	auth.POST("/logout", handlers.Logout)
	auth.GET("/me", handlers.GetCurrentUser)

	api.Use(middleware.JWTAuthMiddleware(jwtSecret))
	users := api.Group("/users")
	{
		users.POST("", handlers.CreateUser)
		users.GET("", handlers.GetUsers)
		users.GET("/:id", handlers.GetUser)
		users.PUT("/:id", handlers.UpdateUser)
		users.DELETE("/:id", handlers.DeleteUser)
	}

	departments := api.Group("/departments")
	{
		departments.POST("", handlers.CreateDepartment)
		departments.GET("", handlers.GetDepartments)
		departments.GET("/:id", handlers.GetDepartment)
		departments.PUT("/:id", handlers.UpdateDepartment)
		departments.DELETE("/:id", handlers.DeleteDepartment)
	}

	approvals := api.Group("/approvals")
	{
		approvals.POST("", handlers.CreateApproval)
		approvals.GET("", handlers.GetApprovals)
		approvals.GET("/:id", handlers.GetApproval)
		approvals.PUT("/:id", handlers.UpdateApproval)
		approvals.DELETE("/:id", handlers.DeleteApproval)
	}

	return r
}
