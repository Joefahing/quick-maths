import { MemoryRouter } from 'react-router-dom';

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../App';

describe('Side menu buttons should be displaying in Game Layout', () => {
	const menuButtons = [
		{ label: /Home/i, iconAlt: /Home/i },
		{ label: /Settings/i, iconAlt: /Settings/i },
		{ label: /Updates/i, iconAlt: /Updates/i },
		{ label: /About Me/i, iconAlt: /About Me/i },
		{ label: /Contact/i, iconAlt: /Contact/i }
	];

	it.each(menuButtons)('User should be able to see $label button', async ({ label, iconAlt }) => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const buttonLabel: HTMLElement = await screen.findByText(label);
		const buttonContainer: HTMLElement | null = buttonLabel.parentElement;
		expect(buttonContainer).not.toBeNull();

		const buttonIcon: HTMLElement = within(buttonContainer as HTMLElement).getByRole('img', { name: iconAlt });
		expect(buttonIcon).toBeVisible();
	});
});
