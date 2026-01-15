import { MemoryRouter } from 'react-router-dom';

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from '../App';
import GeneratedQuestionService from '../shared/services/GeneratedQuestionService';

import styles from '../components/CalculationPanel/QuestionIndicator/QuestionIndicator.module.css';

describe('Calculation panel indicator updates after answers', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Marks first question as correct when the right answer is submitted', async () => {
		const user = userEvent.setup();

		vi.spyOn(GeneratedQuestionService.prototype, 'getQuestion').mockResolvedValue([
			{ id: '1', expression: '1 + 2' },
			{ id: '2', expression: '3 + 4' },
			{ id: '3', expression: '5 + 6' }
		]);

		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const startButton: HTMLElement = screen.getByRole('button', { name: /start/i });
		await user.click(startButton);

		const input: HTMLElement = screen.getByRole('textbox', { name: /answer-input/i });
		await user.type(input, '3');

		const submitButton: HTMLElement = screen.getByRole('button', { name: /submit/i });
		await user.click(submitButton);

		const indicator1: HTMLElement = screen.getByTestId('question-indicator-0');
		expect(within(indicator1).getByRole('img', { name: /Correct Question/i })).toBeInTheDocument();

		const indicator2: HTMLElement = screen.getByTestId('question-indicator-1');
		expect(indicator2).toHaveClass(styles.in_progress);
		expect(within(indicator2).getByText('2')).toBeInTheDocument();

		const indicator3: HTMLElement = screen.getByTestId('question-indicator-2');
		expect(indicator3).not.toHaveClass(styles.in_progress);
		expect(within(indicator3).getByText('3')).toBeInTheDocument();
	});

	it('Marks first question as incorrect when a wrong answer is submitted', async () => {
		const user = userEvent.setup();

		vi.spyOn(GeneratedQuestionService.prototype, 'getQuestion').mockResolvedValue([
			{ id: '1', expression: '1 + 2' },
			{ id: '2', expression: '3 + 4' },
			{ id: '3', expression: '5 + 6' }
		]);

		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const startButton: HTMLElement = screen.getByRole('button', { name: /start/i });
		await user.click(startButton);

		const input: HTMLElement = screen.getByRole('textbox', { name: /answer-input/i });
		await user.type(input, '0');

		const submitButton: HTMLElement = screen.getByRole('button', { name: /submit/i });
		await user.click(submitButton);

		const indicator1: HTMLElement = screen.getByTestId('question-indicator-0');
		expect(within(indicator1).getByRole('img', { name: /Incorrect Question/i })).toBeInTheDocument();

		const indicator2: HTMLElement = screen.getByTestId('question-indicator-1');
		expect(indicator2).toHaveClass(styles.in_progress);
		expect(within(indicator2).getByText('2')).toBeInTheDocument();

		const indicator3: HTMLElement = screen.getByTestId('question-indicator-2');
		expect(indicator3).not.toHaveClass(styles.in_progress);
		expect(within(indicator3).getByText('3')).toBeInTheDocument();
	});
});
