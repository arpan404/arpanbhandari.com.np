package andy

func Build(ch chan error) {
	err := makeFolder()
	if err != nil {
		ch <- err
		return
	}

	ch <- nil

}
