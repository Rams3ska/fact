import { Fragment, useEffect, useState } from 'react';

import axios from 'axios';

import { Loader, SelectsView } from './components';

import { flat, splitToPrimitives, map, filter, includes } from './heplers/customFuncs';

import './assets/styles/App.scss';

const initialState = {
	isFetchLoading: true,
	isFetchError: '',
	dataList: [],
	selectedItems: [],
	stateHistory: [],
	currentState: 0,
};

function App() {
	const [{ isFetchLoading, isFetchError, dataList, selectedItems }, setState] = useState(initialState);

	const fetchData = () => {
		setState((prev) => ({ ...prev, isFetchLoading: true }));

		axios
			.get('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
			.then((resp) => {
				const data = resp.data['testArr'];

				const processedData = splitToPrimitives(flat(data), true);

				setState((prev) => ({ ...prev, dataList: processedData, isFetchLoading: false }));
			})
			.catch((reason) => {
				const errMsg = `Ошибка: не удалось загрузить данные с сервера (${reason.response.data})`;

				setState((prev) => ({ ...prev, isFetchError: errMsg, isFetchLoading: false }));
			});
	};

	const handleSelect = (e) => {
		const { target } = e;

		setState((prev) => ({ ...prev, selectedItems: map([...target.selectedOptions], (v) => v.value) }));
	};

	const pushStateChanges = () => {
		const dateOfChange = new Date().toJSON().slice(0, 19).replace('T', ' ');

		console.log(dateOfChange);
		//
	};

	const moveToPrevState = () => {
		//
	};

	const moveToNextState = () => {
		//
	};

	const resetApp = () => {
		setState({ ...initialState });

		fetchData();
	};

	useEffect(() => fetchData(), []);
	useEffect(() => pushStateChanges(), [selectedItems]);

	return (
		<div className="App">
			{(isFetchLoading && <Loader />) || (isFetchError.length && <h1>{isFetchError}</h1>) || (
				<Fragment>
					<section className="content">
						<div className="data-list island card">
							<h1>Список данных</h1>
							<select
								multiple
								name="data"
								id="data"
								className="data-list__selector"
								size="10"
								value={filter(selectedItems, (v, _, a) => includes(a, v))}
								onChange={handleSelect}
							>
								{map(dataList, (v, i) => (
									<option key={i} value={v}>{`${v}`}</option>
								))}
							</select>
						</div>
						<SelectsView selects={selectedItems} />
					</section>
					<section className="controls">
						<div className="history island card">
							<h1>Посление 10 изменений</h1>
							<ul>
								<li>Пукнул</li>
								<li>Покакал</li>
							</ul>
							<div className="control-buttons">
								<button onClick={resetApp}>Сбросить все</button>
								<button>{'To prev'}</button>
								<button>{'To next'}</button>
							</div>
						</div>
					</section>
				</Fragment>
			)}
		</div>
	);
}

export default App;
