const filter = (array, callbackfn) => {
	let result = [];

	for (const [idx, el] of array.entries()) {
		callbackfn(el, idx, array) && (result = [...result, el]);
	}

	return result;
};

export default filter;
