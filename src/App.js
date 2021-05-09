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
	currentState: 0,
};

const MAX_HISTORY_LENGHT = 10;

let stateHistory = [];

function App() {
	const [state, setState] = useState(initialState);

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

		pushStateChanges();
	};

	const pushStateChanges = () => {
		let newHistory = [];

		const dateOfChange = new Date().toJSON().slice(0, 19).replace('T', ' ');

		if (stateHistory.length >= MAX_HISTORY_LENGHT) {
			for (let i = 1; i < MAX_HISTORY_LENGHT; i++) {
				newHistory = [...newHistory, stateHistory[i]];
			}
			newHistory = [...newHistory, { state: state, dateChange: dateOfChange }];
		} else newHistory = [...stateHistory, { state: state, dateChange: dateOfChange }];

		stateHistory = newHistory;

		setState((prev) => ({
			...prev,
			currentState: newHistory.length - 1,
		}));
	};

	const moveToPrevState = () => {
		if (state.currentState <= 0) return;

		const current = state.currentState;

		setState({ ...stateHistory[current - 1].state, currentState: current - 1 });
	};

	const moveToNextState = () => {
		if (state.currentState >= MAX_HISTORY_LENGHT || stateHistory[state.currentState + 1] === undefined) return;

		const current = state.currentState;

		setState({ ...stateHistory[current + 1].state, currentState: current + 1 });
	};

	const resetApp = () => {
		setState(initialState);

		stateHistory = [];

		fetchData();
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="App">
			{(state.isFetchLoading && <Loader />) || (state.isFetchError.length && <h1>{state.isFetchError}</h1>) || (
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
								value={filter(state.selectedItems, (v, _, a) => includes(a, v))}
								onChange={handleSelect}
							>
								{map(state.dataList, (v, i) => (
									<option key={i} value={v}>{`${v}`}</option>
								))}
							</select>
						</div>
						<SelectsView selects={state.selectedItems} />
					</section>
					<section className="controls">
						<div className="history island card">
							<h1>Последние 10 изменений</h1>
							<ul>
								{map(stateHistory, (v, i) => (
									<li key={i} className={state.currentState === i ? 'history__item_active' : ''}>
										{v.dateChange}
									</li>
								))}
							</ul>
							<div className="control-buttons">
								<button onClick={resetApp}>Сбросить все</button>
								<button onClick={moveToPrevState}>{'To prev'}</button>
								<button onClick={moveToNextState}>{'To next'}</button>
							</div>
						</div>
					</section>
				</Fragment>
			)}
		</div>
	);
}

export default App;
