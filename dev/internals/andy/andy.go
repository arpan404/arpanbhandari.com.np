package andy

import (
	"arpan404/pkg/fs"
	"fmt"
	"os"
	"path/filepath"
)

func Build() error {
	fmt.Println("Building the andy...")
	sourceDir, err := os.Getwd()
	originalDir := sourceDir
	defer os.Chdir(originalDir)

	if err != nil {
		return fmt.Errorf("failed to get current directory: %w", err)
	}

	sourceDir = filepath.Dir(sourceDir)
	sourceDir = filepath.Join(sourceDir, "andy")

	err = os.Chdir(sourceDir)

	if err != nil {
		return fmt.Errorf("failed to change directory to andy original path: %w", err)
	}
	err = copyAndyToProduction(sourceDir)
	if err != nil {
		return fmt.Errorf("failed to copy andy to production: %w", err)
	}

	return nil
}

func createAndyFolder() (string, error) {
	originalPath, err := os.Getwd()

	if err != nil {
		return "", fmt.Errorf("failed to get the current directory: %w", err)
	}

	parentDir := filepath.Dir(originalPath)

	absolutePath := filepath.Join(parentDir, "prod", "andy")

	andyFolder := fs.Directory(absolutePath)

	err = andyFolder.CreateDirectory(true)

	if err != nil {
		return "", fmt.Errorf("failed to create andy directory: %w", err)
	}
	return absolutePath, nil
}

func copyAndyToProduction(sourceDir string) error {
	productionDir, err := createAndyFolder()

	if err != nil {
		return fmt.Errorf("failed to create andy folder: %w", err)
	}

	filesToCopy := []string{
		"server.py", "main.py", "requirements.txt", "environment.yml"}

	for _, file := range filesToCopy {
		sourceFile := fs.File(filepath.Join(sourceDir, file))
		destinationFile := fs.File(filepath.Join(productionDir, file))
		err := sourceFile.Copy(destinationFile)

		if err != nil {
			return fmt.Errorf("failed to copy %s to the production: %w", file, err)
		}
	}

	foldersToCopy := []string{"app", "logs"}

	for _, folder := range foldersToCopy {
		sourceFolder := fs.Directory(filepath.Join(sourceDir, folder))
		destinationFolder := fs.Directory(filepath.Join(productionDir, folder))
		err := sourceFolder.Copy(destinationFolder)

		if err != nil {
			return fmt.Errorf("failed to copy %s to the production: %w", folder, err)
		}
	}

	toCleanUp := []string{"logs"}

	for _, folder := range toCleanUp {
		destFolder := fs.Directory(filepath.Join(productionDir, folder))
		err = destFolder.CreateDirectory(true)
		if err != nil {
			return fmt.Errorf("failed to create %s directory: %w", folder, err)
		}

	}
	return nil
}
