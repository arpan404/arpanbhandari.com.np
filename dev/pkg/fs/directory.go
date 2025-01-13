package fs

import (
	"fmt"
	"os"
	"path/filepath"
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

func (source *directory) Copy(dest * directory) error{
  return filepath.WalkDir(source.path, func(path string, d os.DirEntry, err error) error{
    if err != nil{
      return fmt.Errorf("error accessing path %s: %w", path, err)
    }

  relativePath, err := filepath.Rel(source.path, path)
    if err != nil {
  return fmt.Errorf("error getting relative path: %w", err)
  }
  destPath := filepath.Join(dest.path, relativePath)

  if d.IsDir(){
  if err := os.MkdirAll(destPath, os.ModePerm); err != nil {
    return fmt.Errorf("error creating directory %s: %w", destPath, err)
  }
}else{
  sourceFile := File(path)
    destFile := File(destPath)

if err:= sourceFile.Copy(destFile); err != nil{
    return fmt.Errorf("error copying file %s: %w", path, err)
    }
}
  return nil
})
}
