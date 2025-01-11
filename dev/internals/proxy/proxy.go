package proxy

import (
	"arpan404/pkg/fs"
	"fmt"
)

func Build() {
	fmt.Println("Building the proxy...")
	err := fs.MakeDir("prod/proxy", true)
	if err != nil {
		fmt.Println("Error making proxy folder")
		panic(err)
	}
}
