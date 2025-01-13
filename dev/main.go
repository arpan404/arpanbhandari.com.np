package main

import (
	"arpan404/internals/andy"
	"arpan404/internals/cms"
	"arpan404/internals/proxy"
	"arpan404/internals/web"
	"fmt"
	"os"
	"path/filepath"
)

func main() {
	err := makeProductionFolder()
	if err != nil {
		fmt.Println("Error making production folder")
		panic(err)
	}
	fmt.Println("Production folder created...")

	// Sequential execution of build functions
	err = cms.Build()
	if err != nil {
		fmt.Printf("CMS build failed: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("CMS build completed successfully.")

	err = proxy.Build()
	if err != nil {
		fmt.Printf("Proxy build failed: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Proxy build completed successfully.")

	err = andy.Build()
	if err != nil {
		fmt.Printf("Andy build failed: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Andy build completed successfully.")

	err = web.Build()
	if err != nil {
		fmt.Printf("Web build failed: %v\n", err)
		os.Exit(1)
	}
	fmt.Println("Web build completed successfully.")

	fmt.Println("Build the project successfully for production!!!")
}

func makeProductionFolder() error {
	currentDir, err := os.Getwd()
	if err != nil {
		return err
	}
	prodDir := filepath.Join(currentDir, "prod")
	_, err = os.Stat(prodDir)
	if err != nil {
		if os.IsNotExist(err) {
			fmt.Println("Production folder does not exist. Creating it...")
		} else {
			return fmt.Errorf("error checking production folder, cannot proceed: %w", err)
		}
	} else {
		fmt.Println("Production folder exists. Deleting it for clean build...")
		err = os.RemoveAll(prodDir)
		if err != nil {
			return fmt.Errorf("failed to delete existing production folder: %w", err)
		}

		_, err = os.Stat(prodDir)
		if err == nil {
			return fmt.Errorf("directory still exists after deletion attempt")
		}
	}

	err = os.Mkdir(prodDir, 0755)
	if err != nil {
		return fmt.Errorf("failed to create production folder: %w", err)
	}
	return nil
}
