import React from 'react';

import '../assets/styles/SelectsView.scss';

export default function Selectsview(props) {
	const { selects = [] } = props;

	return (
		<div className="select-list island card ">
			<h1>Список выбранных элементов</h1>
			{!selects.length && <h2>Пусто</h2>}
			<ul>
				{selects.map((x, i) => (
					<li key={i}>{`> ${x}`}</li>
				))}
			</ul>
		</div>
	);
}
