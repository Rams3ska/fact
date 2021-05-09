const map = (array, callbackfn) => {
	let result = [];

	for (const [idx, el] of array.entries()) {
		result = [...result, callbackfn(el, idx, array)];
	}

	return result;
};

export default map;
