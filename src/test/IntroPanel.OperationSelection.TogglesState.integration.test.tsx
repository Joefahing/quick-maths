import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import App from '../App';

import styles from '../components/IntroPanel/OperatorToggleButton/OperatorToggleButton.module.css';

describe('Intro panel operation selection behavior', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	it('Operation button should toggle between selected and unselected when clicked', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const addButton: HTMLElement = screen.getByRole('button', { name: /add/i });
		const subtractButton: HTMLElement = screen.getByRole('button', { name: /subtract/i });

		expect(addButton).toHaveClass(styles.selected);
		expect(subtractButton).not.toHaveClass(styles.selected);

		await user.click(subtractButton);

		expect(subtractButton).toHaveClass(styles.selected);

		await user.click(subtractButton);

		expect(subtractButton).not.toHaveClass(styles.selected);
	});

	it('Single selected operation button should not be able unselect when clicked', async () => {
		const user = userEvent.setup();

		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const addButton: HTMLElement = screen.getByRole('button', { name: /add/i });
		expect(addButton).toHaveClass(styles.selected);

		await user.click(addButton);

		expect(addButton).toHaveClass(styles.selected);
	});
});
