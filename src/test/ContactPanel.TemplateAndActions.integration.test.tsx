import { MemoryRouter } from 'react-router-dom';

import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { EmailTemplateData } from '../assets/types';
import ContactPanelService from '../components/ContactPanel/ContactPanelService';
import groupToggleStyles from '../components/Share/GroupToggleButtons/GroupToggleButtons.module.css';
import App from '../App';

function renderContactPage() {
	return render(
		<MemoryRouter initialEntries={['/contact']}>
			<App />
		</MemoryRouter>
	);
}

describe('Contact panel template and actions', () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	it('Updates template preview when toggling between Feature and Bugs', async () => {
		const user = userEvent.setup();
		renderContactPage();

		const featureButton: HTMLElement = screen.getByRole('button', { name: 'Feature' });
		const bugsButton: HTMLElement = screen.getByRole('button', { name: 'Bugs' });

		expect(featureButton).toHaveClass(groupToggleStyles.selected);
		expect(bugsButton).not.toHaveClass(groupToggleStyles.selected);
		expect(screen.getByText('Quick Maths Feature Request')).toBeVisible();
		expect(screen.getByText('Type: Feature')).toBeVisible();
		expect(screen.getByText('Description:')).toBeVisible();
		expect(screen.getByText('Why:')).toBeVisible();

		await user.click(bugsButton);

		expect(featureButton).not.toHaveClass(groupToggleStyles.selected);
		expect(bugsButton).toHaveClass(groupToggleStyles.selected);
		expect(screen.getByText('Quick Maths Bug Report')).toBeVisible();
		expect(screen.getByText('Type: Bug')).toBeVisible();
		expect(screen.getByText('Device:')).toBeVisible();
		expect(screen.getByText('Expected:')).toBeVisible();
		expect(screen.getByText('Actual:')).toBeVisible();

		await user.click(featureButton);

		expect(featureButton).toHaveClass(groupToggleStyles.selected);
		expect(bugsButton).not.toHaveClass(groupToggleStyles.selected);
		expect(screen.getByText('Quick Maths Feature Request')).toBeVisible();
		expect(screen.getByText('Type: Feature')).toBeVisible();
		expect(screen.getByText('Description:')).toBeVisible();
		expect(screen.getByText('Why:')).toBeVisible();
	});

	it('Copies email address and resets copy status after 3000ms', async () => {
		vi.useFakeTimers();

		const writeTextMock = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);
		Object.defineProperty(navigator, 'clipboard', {
			configurable: true,
			value: { writeText: writeTextMock }
		});

		renderContactPage();

		const copyButton: HTMLElement = screen.getByRole('button', { name: /copy/i });
		expect(copyButton).toBeVisible();

		await act(async () => {
			fireEvent.click(copyButton);
			await Promise.resolve();
			await Promise.resolve();
		});

		expect(writeTextMock).toHaveBeenCalledWith('quickmaths.run@gmail.com');
		expect(screen.getByRole('button', { name: /copied/i })).toBeVisible();

		await act(async () => {
			await vi.advanceTimersByTimeAsync(3000);
		});

		expect(screen.getByRole('button', { name: /copy/i })).toBeVisible();
	});

	it('Calls mailto builder with selected template data when Email Me is clicked', async () => {
		const user = userEvent.setup();
		const originalBuildMailtoString = ContactPanelService.buildMailtoString;
		const buildMailtoStringSpy = vi.spyOn(ContactPanelService, 'buildMailtoString');
		const email = ContactPanelService.email;

		renderContactPage();

		const featureData: EmailTemplateData = {
			email,
			subject: 'Quick Maths Feature Request',
			bodyRow: ['Type: Feature', 'Description:', 'Why:']
		};
		
		const bugData: EmailTemplateData = {
			email,
			subject: 'Quick Maths Bug Report',
			bodyRow: ['Type: Bug', 'Device:', 'Expected:', 'Actual:']
		};

		await user.click(screen.getByRole('button', { name: 'Email Me' }));

		expect(buildMailtoStringSpy).toHaveBeenNthCalledWith(1, featureData);
		expect(buildMailtoStringSpy.mock.results[0]?.type).toBe('return');
		expect(buildMailtoStringSpy.mock.results[0]?.value).toBe(originalBuildMailtoString(featureData));

		await user.click(screen.getByRole('button', { name: 'Bugs' }));
		await user.click(screen.getByRole('button', { name: 'Email Me' }));

		expect(buildMailtoStringSpy).toHaveBeenNthCalledWith(2, bugData);
		expect(buildMailtoStringSpy.mock.results[1]?.type).toBe('return');
		expect(buildMailtoStringSpy.mock.results[1]?.value).toBe(originalBuildMailtoString(bugData));
	});
});
