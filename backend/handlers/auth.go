package handlers

import (
	"employee-management-system/config"
	"employee-management-system/services"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var jwtKey = []byte(config.AppConfig.Server.JWTSecret)

func generateToken(username string) (LoginResponse, error) {
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	str, err := token.SignedString(jwtKey)
	if err != nil {
		return LoginResponse{}, err
	}
	return LoginResponse{
		Token:     str,
		ExpiresAt: expirationTime,
	}, nil
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token     string    `json:"token"`
	ExpiresAt time.Time `json:"expires_at"`
}

// Login godoc
// @Summary User login
// @Description Authenticate user and return JWT token
// @Tags auth
// @Accept json
// @Produce json
// @Param credential body LoginRequest true "Login Credentials"
// @Success 200 {object} LoginResponse
// @Router /auth/login [post]
func Login(c *gin.Context) {
	var credentials LoginRequest
	if err := c.BindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	user, err := services.AuthenticateUser(credentials.Username, credentials.Password)
	if err != nil {
		log.Println(credentials)
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid username or password"})
		return
	}

	token, err := generateToken(user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	c.JSON(http.StatusOK, token)
}

type LogoutResponse struct {
	Message string
}

// Logout godoc
// @Summary User logout
// @Description Logout current user
// @Tags auth
// @Produce json
// @Security Bearer
// @Success 200 {object} LogoutResponse
// @Router /auth/logout [post]
func Logout(c *gin.Context) {
	c.JSON(http.StatusOK, LogoutResponse{Message: "Logged out successfully"})
}

type ErrorResponse struct {
	Message string `json:"msg"`
}

// GetCurrentUser godoc
// @Summary Get current user
// @Description Get details of currently logged-in user
// @Tags auth
// @Produce json
// @Security Bearer
// @Success 200 {object} models.User
// @Failure 401 {object} ErrorResponse
// @Failure 404 {object} ErrorResponse
// @Router /auth/me [get]
func GetCurrentUser(c *gin.Context) {
	tokenStr := c.GetHeader("Authorization")
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, ErrorResponse{Message: "Invalid token"})
		return
	}

	user, err := services.GetUserByUsername(claims.Username)
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{Message: "User not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}
