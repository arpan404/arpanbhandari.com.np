package proxy

import (
	"arpan404/pkg/fs"
	"fmt"
	"os"
	"path/filepath"
)

func Build(ch chan error) {
	fmt.Println("Building the proxy...")
	proxyPath, err := createProxyFolder()
	if err != nil {
		ch <- fmt.Errorf("failed to create proxy folder: %w", err)
		return
	}
	var fileToCopy []string = []string{
		"package.json",
		"server.js",
	}

	sourceFolder, err := os.Getwd()
	if err != nil {
		ch <- fmt.Errorf("failed to get current directory: %w", err)
		return
	}

	sourceFolder = filepath.Dir(sourceFolder)
	sourceFolder = filepath.Join(sourceFolder, "proxy")

	for _, file := range fileToCopy {
		src := fs.File(filepath.Join(sourceFolder, file))
		dest := fs.File(filepath.Join(proxyPath, file))
		err := src.CopyFile(dest)

		if err != nil {
			ch <- fmt.Errorf("failed to copy %v to %v: %w", src, dest, err)
			return
		}
	}

	ch <- nil
	return

}

func createProxyFolder() (string, error) {
	orginalPath, err := os.Getwd()
	if err != nil {
		return "", fmt.Errorf("failed to get current directory: %w", err)
	}

	parentDir := filepath.Dir(orginalPath)

	if err != nil {
		return "", fmt.Errorf("failed to get parent directory: %w", err)
	}
	absolutePath := filepath.Join(parentDir, "prod", "proxy")

	proxyFolder := fs.Directory(absolutePath)
	err = proxyFolder.CreateDirectory(true)

	if err != nil {
		return "", fmt.Errorf("failed to create proxy directory: %w", err)
	}

	return absolutePath, nil
}
