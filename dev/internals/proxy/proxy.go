package proxy

import (
	"arpan404/pkg/fs"
	"fmt"
	"os"
	"path/filepath"
)

func Build() error{
	fmt.Println("Building the proxy...")
	proxyPath, err := createProxyFolder()
	if err != nil {
		return fmt.Errorf("failed to create proxy folder: %w", err)
	}
	var fileToCopy []string = []string{
		"package.json",
		"server.js",
	}

	sourceFolder, err := os.Getwd()
	if err != nil {
		return fmt.Errorf("failed to get current directory: %w", err)
	}

	sourceFolder = filepath.Dir(sourceFolder)
	sourceFolder = filepath.Join(sourceFolder, "proxy")

	for _, file := range fileToCopy {
		src := fs.File(filepath.Join(sourceFolder, file))
		dest := fs.File(filepath.Join(proxyPath, file))
		err := src.Copy(dest)

		if err != nil {
			return fmt.Errorf("failed to copy %v to %v: %w", src, dest, err)
		}
	}

	return nil
}

func createProxyFolder() (string, error) {
	orginalPath, err := os.Getwd()
	if err != nil {
		return "", fmt.Errorf("failed to get current directory: %w", err)
	}

	parentDir := filepath.Dir(orginalPath)

	absolutePath := filepath.Join(parentDir, "prod", "proxy")

	proxyFolder := fs.Directory(absolutePath)
	err = proxyFolder.CreateDirectory(true)

	if err != nil {
		return "", fmt.Errorf("failed to create proxy directory: %w", err)
	}

	return absolutePath, nil
}
