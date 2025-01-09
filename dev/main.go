package main

import (
	"arpan404/internals/andy"
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
	ch := make(chan error)
	var wg sync.WaitGroup
	wg.Add(1)
	go andy.Build(ch)
	go func() {
		err := <-ch
		if err != nil {
			panic(err)
		}
		wg.Done()
	}()
	wg.Wait()
	print("Build the project successfully for production!!!")
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
			return fmt.Errorf("Error checking production folder, cannot proceed: %w", err)
		}
	} else {
		fmt.Println("Production folder exists. Deleting it for clean build...")
		err = os.RemoveAll(prodDir)
		if err != nil {
			return fmt.Errorf("Failed to delete existing production folder: %w", err)
		}

		_, err = os.Stat(prodDir)
		if err == nil {
			return fmt.Errorf("Directory still exists after deletion attempt")
		}
	}

	err = os.Mkdir(prodDir, 0755)
	if err != nil {
		return fmt.Errorf("Failed to create production folder: %w", err)
	}
	return nil
}
