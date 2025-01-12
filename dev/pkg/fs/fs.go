package fs

import (
	"fmt"
	"os"
	"path/filepath"
)

func MakeDir(path string, clean bool) error {
	absPath, err := filepath.Abs(path)

	if err != nil {
		return err
	}

	_, err = os.Stat(absPath)
	if err != nil {
		if os.IsNotExist(err) {
			fmt.Printf("%v does not exist. Creating it...\n", absPath)
		} else {
			return fmt.Errorf("error checking %v, cannot proceed: %w", absPath, err)
		}
	} else {
		if clean {
			err = os.RemoveAll(absPath)
			if err != nil {
				return fmt.Errorf("failed to delete existing %v: %w", absPath, err)
			}
			_, err = os.Stat(absPath)

			if err == nil {
				return fmt.Errorf("tried but failed to delete existing %v: %w", absPath, err)
			}
		}
	}

	_, err = os.Stat(absPath)
	if err == nil && !clean {
		fmt.Printf("%v exists. Skipping creation...", absPath)
		return nil
	}

	if err != nil {
		fmt.Printf("%v deleted. Recreating...", absPath)
		err = os.Mkdir(absPath, 0755)
		if err != nil {
			return fmt.Errorf("error creating %v: %w", absPath, err)
		}
	}

	return fmt.Errorf(("failed to create %v"), absPath)
}

func MoveFiles(src, dest string) error {
	_, err := os.Stat(src)
	if err != nil {
		return fmt.Errorf("source %v does not exist: %w", src, err)
	}
	return nil
}

func DoesExists(path string) bool {
	_, err := os.Stat(path)
	if err != nil {
		return false
	}
	return true
}
