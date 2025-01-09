package andy

import (
	"os"
	"path/filepath"
)

// This creates a folder named andy in the prod directory of current directory
func makeFolder() error {
	originalDir, err := os.Getwd()
	defer os.Chdir(originalDir)
	if err != nil {
		return err
	}

	andyDir := filepath.Join(originalDir, "prod", "andy")
	err = os.Mkdir(andyDir, 0755)

	if err != nil {
		return err
	}
	return nil
}

func buildRequirements() error {
	originalDir, err := os.Getwd()
	defer os.Chdir(originalDir)
	if err != nil {
		return err
	}
	return nil
}
