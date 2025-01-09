package andy

import (
	"sync"
)

func Build(ch chan error, wg *sync.WaitGroup) {
	defer wg.Done()
	_, err := prepare()
	if err != nil {
		ch <- err
		return
	}
	err = copy()
	if err != nil {
		ch <- err
		return
	}

	ch <- nil
}
