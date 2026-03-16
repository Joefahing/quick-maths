import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from '../App';
import GeneratedQuestionService from '../shared/services/GeneratedQuestionService';

describe('ScorePanel navigation behavior', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	async function completeGame(user: UserEvent): Promise<void> {
		vi.spyOn(GeneratedQuestionService.prototype, 'getQuestion').mockResolvedValue([
			{ id: '1', expression: '1 + 2' }
		]);

		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const startButton = screen.getByRole('button', { name: /start/i });
		await user.click(startButton);

		const input = await screen.findByRole('textbox', { name: /answer-input/i });
		await user.type(input, '3');

		const submitButton = screen.getByRole('button', { name: /submit/i });
		await user.click(submitButton);

		await screen.findByRole('heading', { name: /result/i });
	}

	it('Shows ScorePanel after completing the game', async () => {
		const user = userEvent.setup();

		await completeGame(user);

		expect(screen.getByRole('heading', { name: /result/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /again/i })).toBeInTheDocument();
	});

	it('Returns to IntroPanel when Escape is pressed on ScorePanel', async () => {
		const user = userEvent.setup();

		await completeGame(user);

		await user.keyboard('{Escape}');

		const introHeading = await screen.findByRole('heading', { name: /ready to do quick math/i });
		expect(introHeading).toBeInTheDocument();
	});

	it('Redirects to home when navigating directly to /score with no game session', async () => {
		render(
			<MemoryRouter initialEntries={['/score']}>
				<App />
			</MemoryRouter>
		);

		const introHeading = await screen.findByRole('heading', { name: /ready to do quick math/i });
		expect(introHeading).toBeInTheDocument();
	});
});
