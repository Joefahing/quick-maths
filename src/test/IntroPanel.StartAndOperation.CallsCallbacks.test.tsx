import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { describe, expect, it, type Mock, vi } from 'vitest';

import { Operation } from '../assets/types';
import { IntroPanel } from '../components/IntroPanel/IntroPanel';

describe('IntroPanel start and operation callbacks', () => {
	it('Calls onStart when start button is clicked', async () => {
		const user: UserEvent = userEvent.setup();
		const handleStart: Mock = vi.fn();
		const handleOperationClicked: Mock = vi.fn();

		render(
			<IntroPanel
				selectedOperations={Operation.Add}
				year={2025}
				userActivities={[]}
				userActivitiesStreak={0}
				onStart={handleStart}
				onOperationClicked={handleOperationClicked}
			/>
		);

		const startButton = screen.getByRole('button', {
			name: /Start/i
		});

		await user.click(startButton);

		expect(handleStart).toHaveBeenCalledOnce();
		expect(handleOperationClicked).not.toHaveBeenCalled();
	});

	it('Calls onStart when enter button is pressed', async () => {
		const user: UserEvent = userEvent.setup();
		const handleStart: Mock = vi.fn();
		const handleOperationClicked: Mock = vi.fn();

		render(
			<IntroPanel
				selectedOperations={Operation.Add}
				year={2025}
				userActivities={[]}
				userActivitiesStreak={0}
				onOperationClicked={handleOperationClicked}
				onStart={handleStart}
			/>
		);

		await user.keyboard('{enter}');

		expect(handleStart).toHaveBeenCalledOnce();
		expect(handleOperationClicked).not.toHaveBeenCalled();
	});

	it('Calls onOperationClicked when each OperatorToggleButton is clicked', async () => {
		const user: UserEvent = userEvent.setup();

		const handleOperationClicked: Mock = vi.fn();
		const handleStart: Mock = vi.fn();

		render(
			<IntroPanel
				selectedOperations={Operation.Add}
				year={2025}
				userActivities={[]}
				userActivitiesStreak={0}
				onOperationClicked={handleOperationClicked}
				onStart={handleStart}
			/>
		);

		const addButton = screen.getByRole('button', { name: /add/i });
		const subtractButton = screen.getByRole('button', { name: /subtract/i });
		const multiplication = screen.getByRole('button', { name: /multiplication/i });

		await user.click(addButton);
		await user.click(subtractButton);
		await user.click(multiplication);

		expect(handleOperationClicked).toHaveBeenNthCalledWith(1, Operation.Add);
		expect(handleOperationClicked).toHaveBeenNthCalledWith(2, Operation.Subtract);
		expect(handleOperationClicked).toHaveBeenNthCalledWith(3, Operation.Multiply);
	});
});
