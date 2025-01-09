package main

import (
	"arpan404/internals/andy"
	"fmt"
	"os"
	"path/filepath"
	"sync"
)

func main() {
	_, err := prepare()
	if err != nil {
		fmt.Println("Error preparing the build:", err)
		return
	}

	var wg sync.WaitGroup
	errChan := make(chan error)

	wg.Add(1)
	go andy.Build(errChan, &wg)

	var buildErr error
	go func() {
		if err := <-errChan; err != nil {
			buildErr = err
		}
		close(errChan)
	}()

	wg.Wait()

	if buildErr != nil {
		fmt.Println("Error during build:", buildErr)
		return
	}

	fmt.Println("Build completed successfully.")
}

func prepare() (bool, error) {
	fmt.Println("Preparing the builds...")

	current_dir, err := os.Getwd()
	if err != nil {
		return false, err
	}
	prod_dir := filepath.Join(current_dir, "prod")
	_, err = os.Stat(prod_dir)

	if os.IsNotExist(err) {
		fmt.Println("prod directory does not exist. Creating it.")
	} else {
		fmt.Println("prod directory already exists. Deleting existing files.")
		err = os.RemoveAll(prod_dir)
		if err != nil {
			return false, err
		}
	}
	err = os.Mkdir(prod_dir, 0755)
	if err != nil {
		return false, err
	}
	fmt.Println("Folder created successfully for builds.")
	return true, nil
}
