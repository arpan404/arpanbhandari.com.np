package cms

import (
	"arpan404/pkg/fs"
	"fmt"
	"os"
	"os/exec"
	"path"
	"path/filepath"
)

func Build() error {
	fmt.Println("Building the cms...")

	sourceDir, err := os.Getwd()
	originalDir := sourceDir
	defer os.Chdir(originalDir)

	if err != nil {
		return fmt.Errorf("failed to get current directory: %w", err)
	}

	sourceDir = filepath.Dir(sourceDir)
	sourceDir = filepath.Join(sourceDir, "cms")

	err = os.Chdir(sourceDir)

	if err != nil {
		return fmt.Errorf("failed to change directory to cms original path: %w", err)
	}

	err = buildAndCopyCms(sourceDir)

	if err != nil {
		return fmt.Errorf("failed to build and copy cms to the production: %w", err)
	}

	fmt.Println("Copied cms to the production")
	return nil
}

func createCmsFolder() (string, error) {
	originalPath, err := os.Getwd()

	if err != nil {
		return "", fmt.Errorf("failed to get the current directory: %w", err)
	}

	parentDir := filepath.Dir(originalPath)

	absolutePath := filepath.Join(parentDir, "prod", "cms")

	cmsFolder := fs.Directory(absolutePath)

	err = cmsFolder.CreateDirectory(true)

	if err != nil {
		return "", fmt.Errorf("failed to create cms directory: %w", err)
	}
	return absolutePath, nil
}

func buildAndCopyCms(sourceDir string) error {
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

	fmt.Println("Built the CMS using npm. Copying files to production...")

	destinationDir, err := createCmsFolder()
	if err != nil {
		return fmt.Errorf("failed to create a production CMS folder: %w", err)
	}

	foldersToMake := []string{filepath.Join("public", "uploads")}

	for _, folder := range foldersToMake {
		destinationDir := fs.Directory(filepath.Join(destinationDir, folder))
		destinationDir.CreateDirectory(true)
	}

	filesToCopy := []string{"favicon.ico", "package.json", "tsconfig.json", "server.js", filepath.Join("public", "uploads", ".gitkeep"), filepath.Join("public", "robots.txt")}

	for _, file := range filesToCopy {
		sourceFile := fs.File(filepath.Join(sourceDir, file))
		destinationFile := fs.File(filepath.Join(destinationDir, file))
		err = sourceFile.Copy(destinationFile)
		if err != nil {
			return fmt.Errorf("failed to copy file %s: %w", file, err)
		}
	}

	foldersToCopy := []string{"dist", "config", "database", "scripts", "src", "types"}

	for _, folder := range foldersToCopy {
		sourceFolder := fs.Directory(path.Join(sourceDir, folder))
		fmt.Println(sourceFolder)
		destinationFolder := fs.Directory(path.Join(destinationDir, folder))
		err = sourceFolder.Copy(destinationFolder)
		fmt.Println(sourceFolder, destinationFolder)
		if err != nil {
			return fmt.Errorf("failed to copy %s folder: %w", folder, err)
		}
	}

	toCleanFolders := []string{filepath.Join("dist", "build", "uploads")}

	for _, folder := range toCleanFolders {
		cleaningFolder := fs.Directory(path.Join(destinationDir, folder))
		err = cleaningFolder.CreateDirectory(true)
		if err != nil {
			return fmt.Errorf("failed to clean up the folder: %w", err)
		}
	}

	gitkeepUploadSource := fs.File(filepath.Join(sourceDir, "dist", "build", "uploads", ".gitkeep"))
	gitkeepUploadDestination := fs.File(filepath.Join(destinationDir, "dist", "build", "uploads", ".gitkeep"))
	err = gitkeepUploadSource.Copy(gitkeepUploadDestination)

	if err != nil {
		return fmt.Errorf("failed to copy the .gitkeep file: %w", err)
	}

	return nil
}
