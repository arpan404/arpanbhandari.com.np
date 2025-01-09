package andy

import (
	"bufio"
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"

	"gopkg.in/yaml.v2"
)

type Environment struct {
	Name         string        `yaml:"name"`
	Channels     []string      `yaml:"channels"`
	Dependencies []interface{} `yaml:"dependencies"`
}

func prepare() (bool, error) {
	originalDir, err := os.Getwd()
	if err != nil {
		return false, fmt.Errorf("failed to get current directory: %w", err)
	}
	defer os.Chdir(originalDir)

	// Setup directories
	andyDir := filepath.Join(originalDir, "prod", "andy")
	fmt.Println("Andy build directory:", andyDir)

	if _, err := os.Stat(andyDir); err == nil {
		fmt.Println("andy directory already exists. Deleting existing files.")
		if err := os.RemoveAll(andyDir); err != nil {
			return false, fmt.Errorf("failed to remove existing andy directory: %w", err)
		}
	}

	if err := os.MkdirAll(andyDir, 0755); err != nil {
		return false, fmt.Errorf("failed to create andy directory: %w", err)
	}

	parentDir := filepath.Dir(originalDir)
	if parentDir == "." {
		return false, fmt.Errorf("current directory is the root, cannot move up")
	}

	andyOrgDir := filepath.Join(parentDir, "andy")
	if err := os.Chdir(andyOrgDir); err != nil {
		return false, fmt.Errorf("failed to change to andy directory: %w", err)
	}

	// Get versions from environment.yml
	versions, err := extractVersionsFromYaml(filepath.Join(andyOrgDir, "environment.yml"))
	if err != nil {
		return false, fmt.Errorf("failed to read environment.yml: %w", err)
	}

	// Get current pip packages
	cmd := exec.Command("conda", "run", "-n", "andy", "pip", "freeze")
	cmd.Dir = andyOrgDir
	output, err := cmd.CombinedOutput()
	if err != nil {
		return false, fmt.Errorf("failed to run pip freeze: %v\nOutput: %s", err, output)
	}

	// Clean and merge requirements
	cleanedReqs, err := cleanRequirements(output, versions)
	if err != nil {
		return false, fmt.Errorf("failed to clean requirements: %w", err)
	}

	requirementsFile := filepath.Join(andyOrgDir, "requirements.txt")
	if err := os.WriteFile(requirementsFile, []byte(cleanedReqs), 0644); err != nil {
		return false, fmt.Errorf("failed to write requirements.txt: %w", err)
	}

	fmt.Println("Successfully created clean requirements.txt")
	return true, nil
}

func extractVersionsFromYaml(yamlPath string) (map[string]string, error) {
	versions := make(map[string]string)

	data, err := os.ReadFile(yamlPath)
	if err != nil {
		return versions, err
	}

	var env Environment
	if err := yaml.Unmarshal(data, &env); err != nil {
		return versions, err
	}

	for _, dep := range env.Dependencies {
		switch v := dep.(type) {
		case string:
			// Handle conda-style dependencies
			parts := strings.Split(v, "=")
			if len(parts) >= 2 && !strings.HasPrefix(parts[0], "python") {
				name := strings.ToLower(parts[0])
				// Convert underscore to hyphen in package names
				name = strings.ReplaceAll(name, "_", "-")
				versions[name] = parts[1]
			}
		case map[interface{}]interface{}:
			// Handle pip dependencies
			if pipDeps, ok := v["pip"].([]interface{}); ok {
				for _, pipDep := range pipDeps {
					if pipStr, ok := pipDep.(string); ok {
						parts := strings.Split(pipStr, "==")
						if len(parts) >= 2 {
							name := strings.ToLower(parts[0])
							versions[name] = parts[1]
						}
					}
				}
			}
		}
	}

	return versions, nil
}

func cleanRequirements(output []byte, versions map[string]string) (string, error) {
	scanner := bufio.NewScanner(bytes.NewReader(output))
	var cleanedLines []string

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		// Split package name and version
		parts := strings.Split(line, "==")
		packageName := strings.ToLower(parts[0])

		// Convert underscore to hyphen in package names
		packageName = strings.ReplaceAll(packageName, "_", "-")

		// If we have a version from environment.yml, use it
		if version, ok := versions[packageName]; ok {
			cleanedLines = append(cleanedLines, fmt.Sprintf("%s==%s", packageName, version))
		} else if len(parts) > 1 {
			cleanedLines = append(cleanedLines, line)
		} else {
			// If no version anywhere, just keep the package name
			cleanedLines = append(cleanedLines, packageName)
		}
	}

	if err := scanner.Err(); err != nil {
		return "", err
	}

	sort.Strings(cleanedLines)
	return strings.Join(cleanedLines, "\n"), nil
}
