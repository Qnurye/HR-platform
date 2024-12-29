package main

import (
	"employee-management-system/config"
	"employee-management-system/database"
	_ "employee-management-system/docs"
	"employee-management-system/routes"
	"employee-management-system/services"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

//	@title	Employee Management System API
//	@version	1.0
//	@description	This is a sample server for an employee management system.
//	@termsOfService	http://swagger.io/terms/

//	@contact.name	API Support
//	@contact.url	http://www.swagger.io/support
//	@contact.email	support@swagger.io

//	@license.name	Apache 2.0
//	@license.url	http://www.apache.org/licenses/LICENSE-2.0.html

//	@host		localhost:8080
//	@BasePath	/

//	@securityDefinitions.apikey Bearer
//	@in header
//	@name Authorization

func main() {
	config.LoadConfig()
	database.ConnectDB()
	services.CreateSuperUser()

	r := gin.Default()
	gin.SetMode(gin.DebugMode)

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	r = routes.SetupRouter(r, []byte(config.AppConfig.Server.JWTSecret))

	port := config.AppConfig.Server.Port

	if err := r.Run(fmt.Sprintf(":%d", port)); err != nil {
		log.Fatal("Failed to start!")
	} else {
		log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), r))
	}

}
