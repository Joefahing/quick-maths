import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';

import { Operation } from '../assets/types';
import { IntroPanel } from '../components/IntroPanel/IntroPanel';
import { gameSession } from '../store/GameSessionSlice';
import { gameSetting } from '../store/GameSettingSlice';
import { userActivity } from '../store/UserActivitySlice';

describe('IntroPanel start and operation callbacks', () => {
	function renderIntroPanel(onStartButtonClicked = vi.fn()) {
		const store = configureStore({
			reducer: {
				gameSetting,
				gameSession,
				userActivity
			}
		});

		render(
			<Provider store={store}>
				<IntroPanel onStartButtonClicked={onStartButtonClicked} />
			</Provider>
		);

		return { onStartButtonClicked, store };
	}

	it('Calls onStart when start button is clicked', async () => {
		const user: UserEvent = userEvent.setup();
		const { onStartButtonClicked, store } = renderIntroPanel();

		const startButton = screen.getByRole('button', { name: /Start/i });

		await user.click(startButton);

		expect(onStartButtonClicked).toHaveBeenCalledOnce();
		expect(store.getState().gameSetting.selectedOperations).toBe(Operation.Add);
	});

	it('Calls onStart when enter button is pressed', async () => {
		const user: UserEvent = userEvent.setup();
		const { onStartButtonClicked, store } = renderIntroPanel();

		await user.keyboard('{enter}');

		expect(onStartButtonClicked).toHaveBeenCalledOnce();
		expect(store.getState().gameSetting.selectedOperations).toBe(Operation.Add);
	});

	it('Updates selected operations in the store when each OperatorToggleButton is clicked', async () => {
		const user: UserEvent = userEvent.setup();
		const { store } = renderIntroPanel();

		const subtractButton = screen.getByRole('button', { name: /subtract/i });
		const multiplicationButton = screen.getByRole('button', { name: /multiplication/i });
		const addButton = screen.getByRole('button', { name: /add/i });

		await user.click(subtractButton);
		expect(store.getState().gameSetting.selectedOperations).toBe(Operation.Add | Operation.Subtract);

		await user.click(multiplicationButton);
		expect(store.getState().gameSetting.selectedOperations).toBe(
			Operation.Add | Operation.Subtract | Operation.Multiply
		);

		await user.click(addButton);
		expect(store.getState().gameSetting.selectedOperations).toBe(Operation.Subtract | Operation.Multiply);
	});

	it('Keeps the last selected operation active', async () => {
		const user: UserEvent = userEvent.setup();
		const { store } = renderIntroPanel();

		const addButton = screen.getByRole('button', { name: /add/i });

		await user.click(addButton);

		expect(store.getState().gameSetting.selectedOperations).toBe(Operation.Add);
	});
});
