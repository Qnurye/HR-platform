package main

import (
	"crypto/rand"
	config2 "employee-management-system/config"
	"encoding/hex"
	"fmt"
	"os"

	"github.com/BurntSushi/toml"
)

func generateRandomKey(length int) (string, error) {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}

func main() {
	secretKey, err := generateRandomKey(32)
	if err != nil {
		fmt.Println("Error generating secret key:", err)
		return
	}

	var config config2.Config
	if _, err := toml.DecodeFile("config/config.toml", &config); err != nil {
		fmt.Println("Error reading config file:", err)
		return
	}

	config.Server.JWTSecret = secretKey

	file, err := os.Create("config/config.toml")
	if err != nil {
		fmt.Println("Error creating config file:", err)
		return
	}
	defer func(file *os.File) {
		err := file.Close()
		if err != nil {
			return
		}
	}(file)

	if err := toml.NewEncoder(file).Encode(config); err != nil {
		fmt.Println("Error encoding config to file:", err)
		return
	}

	fmt.Println("JWT secret key generated and stored in config.toml")
}
