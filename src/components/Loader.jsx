import React from 'react';

import '../assets/styles/Loader.css';

export default function Loader() {
	return (
		<div className="lds-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
