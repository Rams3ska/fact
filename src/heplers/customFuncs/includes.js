const includes = (array, element, fromIndex = 0) => {
	if (fromIndex < 0) throw Error('The index cannot be less than zero');

	for (let i = fromIndex; i < array.length; i++) {
		if (array[i] === element) return true;
	}

	return false;
};

export default includes;
