package andy

import (
	"fmt"
	"os"
	"path/filepath"
)

func copy() error {
	currentDir, err := os.Getwd()
	if err != nil {
		return err
	}

	parentDir := filepath.Dir(currentDir)
	if parentDir == "." {
		return fmt.Errorf("current directory is the root, cannot move up")
	}

	// destDir := filepath.Join(currentDir, "prod", "andy")
	// sourceDir := filepath.Join(parentDir, "andy")

	// foldersToCopy := []string{"app"}
	// filesToCopy := []string{"main.py"}

	return nil
}
