package fs

import (
	"fmt"
	"io"
	"os"
)

type File struct {
	OrgPath  string
	DestPath string
}

func (f *File) Copy() error {
	var exits = doesExists(f.OrgPath)

	if !exits {
		return fmt.Errorf("source %v does not exist", f.OrgPath)
	}

	var destExists = doesExists(f.DestPath)

	if destExists {
		return fmt.Errorf("destination %v already exists", f.DestPath)
	}
	srcFile, err := os.Open(f.OrgPath)
	if err != nil {
		return err
	}
	defer srcFile.Close()

	destFile, err := os.Create(f.DestPath)
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

func deleteFile(path string) error {
	err := os.Remove(path)
	if err != nil {
		return fmt.Errorf("failed to delete %v", path)
	}
	return nil
}
