package cms

import (
	"log"
	"os"
	"os/exec"
)

func installDependencies() {
	os.Chdir("./cms")
	cmd := exec.Command("npm", "install")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Run()
	if err != nil {
		log.Fatalf("cmd.Run() failed with %s\n", err)
	}
}
