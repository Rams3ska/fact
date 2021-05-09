const flat = (array) => {
	let result = [];

	(function doFlat(arr) {
		for (const elem of arr) {
			Array.isArray(elem) ? doFlat(elem) : (result = [...result, elem]);
		}
	})(array);

	return result;
};

export default flat;
