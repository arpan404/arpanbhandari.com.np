package cms

import (
	"arpan404/pkg/fs"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

func Build(ch chan error){
  fmt.Println("Building the cms...")
  
  sourceDir, err := os.Getwd()
  originalDir:= sourceDir

  if err != nil{
    ch<-fmt.Errorf("failed to get current directory: %w", err)
    return
  }
  
  sourceDir = filepath.Dir(sourceDir)
  sourceDir = filepath.Join(sourceDir, "cms")

  err = os.Chdir(sourceDir)

  if err != nil {
    ch<-fmt.Errorf("failed to change directory to cms original path: %w", err)
    return
  }

  cmd := exec.Command("npm", "run", "build")

  _, err = cmd.Output()
  
  if err != nil {
    ch<-fmt.Errorf("failed to build the cms using npm: %w", err)
    return
  }
  
  fmt.Println("Built the cms using npm. Copying files to prod...")

  err = os.Chdir(originalDir)

  if err != nil{
    ch<-fmt.Errorf("failed to change the directory back to original after building cms using node: %w", err)
    return
  }
  

  destinationDir, err := createCmsFolder()

  if err != nil{
    ch<-fmt.Errorf("failed to create a production cms folder: %w", err)
    return
  }

  var filesToCopy []string = []string{
  "favicon.ico", 
  "package.json",
  "tsconfig.json"}

  for _, file := range(filesToCopy){
    sourceFile := fs.File(filepath.Join(sourceDir, file)) 
    destinationFile := fs.File(filepath.Join(destinationDir, file))
    err = sourceFile.CopyFile(destinationFile)

    if err != nil {
      ch<-fmt.Errorf("failed to copy file: %w", err)
      return
    }
  }
  ch<-nil
  return
}

func createCmsFolder()(string, error){
  originalPath, err := os.Getwd()
  
  if err != nil{
    return "", fmt.Errorf("failed to get the current directory: %w", err)
  }

  parentDir:=filepath.Dir(originalPath)
  
  absolutePath:= filepath.Join(parentDir, "prod", "cms")

  cmsFolder:= fs.Directory(absolutePath)

  err = cmsFolder.CreateDirectory(true)

  if err!= nil{
    return "", fmt.Errorf("failed to create cms directory: %w", err)
  }
  return absolutePath, nil
}
