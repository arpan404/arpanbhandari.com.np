package web

import (
	"arpan404/pkg/fs"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

func Build() error {
	fmt.Println("Building the web...")
	sourceDir, err := os.Getwd()
	originalDir := sourceDir
	defer os.Chdir(originalDir)

	if err != nil {
		return fmt.Errorf("failed to get current directory: %w", err)
	}

	sourceDir = filepath.Dir(sourceDir)
	sourceDir = filepath.Join(sourceDir, "web")

	err = os.Chdir(sourceDir)

	if err != nil {
		return fmt.Errorf("failed to change directory to web original path: %w", err)
	}

	err = checkBuild()

	if err != nil {
		return err
	}
	destPath, err := createWebFolder()

	if err != nil {
		return fmt.Errorf("failed to create web folder: %w", err)
	}

	foldersToCopy := []string{"actions", "app", "components", "hooks", "lib", "public", "types"}

	for _, folder := range foldersToCopy {
		sourceFolder := fs.Directory(filepath.Join(sourceDir, folder))
		destFolder := fs.Directory(filepath.Join(destPath, folder))

		err = sourceFolder.Copy(destFolder)
		if err != nil {
			return fmt.Errorf("failed to copy %s folder: %w", folder, err)
		}
	}

	filesToCopy := []string{".gitignore", "package.json", "tsconfig.json", "next.config.ts", ".npmrc", "empty-module.ts", "components.json", "tailwind.config.ts", "postcss.config.mjs", "eslint.config.mjs"}

	for _, file := range filesToCopy {
		sourceFile := fs.File(filepath.Join(sourceDir, file))
		destFile := fs.File(filepath.Join(destPath, file))
		err = sourceFile.Copy(destFile)
		if err != nil {
			return fmt.Errorf("failed to copy %s file: %w", file, err)
		}
	}

	fmt.Println("Checked build and copied web to the production...")
	return nil

}

func checkBuild() error {
	cmd := exec.Command("npm", "run", "build")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Start()
	if err != nil {
		return fmt.Errorf("error starting the CMS build command: %w", err)
	}

	err = cmd.Wait()
	if err != nil {
		return fmt.Errorf("error running the CMS command: %w", err)
	}
	return nil
}
func createWebFolder() (string, error) {
	originalPath, err := os.Getwd()

	if err != nil {
		return "", fmt.Errorf("failed to get the current directory: %w", err)
	}

	parentDir := filepath.Dir(originalPath)

	absolutePath := filepath.Join(parentDir, "prod", "web")

	webFolder := fs.Directory(absolutePath)

	err = webFolder.CreateDirectory(true)

	if err != nil {
		return "", fmt.Errorf("failed to create web directory: %w", err)
	}
	return absolutePath, nil
}
