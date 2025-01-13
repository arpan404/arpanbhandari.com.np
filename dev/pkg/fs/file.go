package fs

import (
	"fmt"
	"io"
	"os"
)

type file struct {
	path string
}

func File(path string) *file {
	return &file{path: path}
}

func (f *file) Delete() error {
	err := os.Remove(f.path)
	if err != nil {
		return fmt.Errorf("failed to delete %v", f.path)
	}
	return nil
}

func (f *file) Copy(dest *file) error {
	srcExists := DoesExists(f.path)
	if !srcExists {
		return fmt.Errorf("source %v does not exist", f.path)
	}

	destExists := DoesExists(dest.path)
	if destExists {
		return fmt.Errorf("destination %v already exists", dest)
	}
	srcFile, err := os.Open(f.path)
	if err != nil {
		return err
	}
	defer srcFile.Close()

	destFile, err := os.Create(dest.path)
	if err != nil {
		return err
	}
	defer destFile.Close()

	_, err = io.Copy(destFile, srcFile)
	if err != nil {
		return err
	}
	return nil
}

func (f *file) Move(dest *file) error {
	err := f.Copy(dest)
	if err != nil {
		return err
	}
	err = f.Delete()
	if err != nil {
		return err
	}
	return nil
}
