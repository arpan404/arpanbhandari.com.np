package main

import (
	"arpan404/internals/andy"
	"arpan404/internals/cms"
	"arpan404/internals/proxy"
	"fmt"
	"os"
	"path/filepath"
	"sync"
)

func main() {
	err := makeProductionFolder()
	if err != nil {
		fmt.Println("Error making production folder")
		panic(err)
	}
	fmt.Println("Production folder created...")

	var wg sync.WaitGroup
	wg.Add(3)

	var errors []error
	var mu sync.Mutex

	go func() {
		defer wg.Done()
		err := cms.Build()
		if err != nil {
			mu.Lock()
			errors = append(errors, fmt.Errorf("cms build failed: %w", err))
			mu.Unlock()
		} else {
			fmt.Println("CMS build completed successfully.")
		}
	}()

	go func() {
		defer wg.Done()
		err := proxy.Build()
		if err != nil {
			mu.Lock()
			errors = append(errors, fmt.Errorf("proxy build failed: %w", err))
			mu.Unlock()
		} else {
			fmt.Println("Proxy build completed successfully.")
		}
	}()

	go func() {
		defer wg.Done()
		err := andy.Build()
		if err != nil {
			mu.Lock()
			errors = append(errors, fmt.Errorf("andy build failed: %w", err))
			mu.Unlock()
		} else {
			fmt.Println("Andy build completed successfully.")
		}
	}()

	wg.Wait()

	if len(errors) > 0 {
		fmt.Println("Build process encountered errors:")
		for _, err := range errors {
			fmt.Println(err)
		}
		os.Exit(1)
	}

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
