package web

import (
	"fmt"
	"os"
)

func build() {
	var webDir string = "../web"
	err := os.Chdir(webDir)
	if err != nil {
		fmt.Printf("Error changing directory to %s\n", webDir)
	}
	fmt.Println("Building web app...")

}
