package fs

import (
	"fmt"
	"os"
)

type directory struct {
	path string
}

func Directory(path string) *directory {
	return &directory{path: path}
}

func (d *directory) DeleteDirectory() error {
	err := os.RemoveAll(d.path)
	if err != nil {
		return fmt.Errorf("failed to delete %v", d.path)
	}
	return nil
}

func (d *directory) CreateDirectory(clean bool) error {
	if clean {
		_, err := os.Stat(d.path)
		if err == nil {
			err = os.RemoveAll(d.path)
			if err != nil {
				return fmt.Errorf("failed to delete existing %v", d.path)
			}
		} else {
			if !os.IsNotExist(err) {
				return fmt.Errorf("failed to delete existing %v", d.path)
			}
		}
	}
	if !clean && DoesExists(d.path) {
		fmt.Printf("%v already exists. Use clean mode to create a clean directory\n", d.path)
		return nil
	}
	err := os.MkdirAll(d.path, os.ModePerm)
	if err != nil {
		return err
	}
	return nil
}
