const splitToPrimitives = (array, stringify = false) => {
	let result = [];
	const tempObj = {};

	for (const el of array) {
		if (el === null) {
			!tempObj.hasOwnProperty('null') && (tempObj['null'] = []);
			tempObj['null'] = [...tempObj['null'], stringify ? JSON.stringify(el) : el];
			continue;
		}

		!tempObj.hasOwnProperty(typeof el) && (tempObj[typeof el] = []);
		tempObj[typeof el] = [...tempObj[typeof el], stringify ? JSON.stringify(el) : el];
	}

	for (const el in tempObj) {
		result = [...result, tempObj[el]];
	}

	return result;
};

export default splitToPrimitives;
