import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from '../App';

describe('Clicking Side Menu Buttons', () => {
	it('User should navigate to Updates page and see UpdatesPanel when Updates button is clicked', async () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const user = userEvent.setup();

		const updatesButton: HTMLElement = await screen.findByAltText('Updates');

		await user.click(updatesButton);

		const comingSoonText: HTMLElement = await screen.findByText('Coming Soon');
		expect(comingSoonText).toBeVisible();
	});

	it('User should navigate to Contact page and see ContactPanel when Contact button is clicked', async () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const user = userEvent.setup();

		const contactButton: HTMLElement = await screen.findByAltText('Contact');

		await user.click(contactButton);

		const comingSoonText: HTMLElement = await screen.findByText('Coming Soon');
		expect(comingSoonText).toBeVisible();
	});

	it('User should navigate to Settings page and see SettingsPanel when Updates button is clicked', async () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const user = userEvent.setup();

		const settingsButton: HTMLElement = await screen.findByAltText('Settings');

		await user.click(settingsButton);

		const comingSoonText: HTMLElement = await screen.findByText('Coming Soon');
		expect(comingSoonText).toBeVisible();
	});

	it('User should navigate to About page and see AboutPanel when About button is clicked', async () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<App />
			</MemoryRouter>
		);

		const user = userEvent.setup();

		const aboutButton: HTMLElement = await screen.findByAltText('About Me');

		await user.click(aboutButton);

		const aboutMeHeader: HTMLElement = await screen.findByRole('heading', { name: /about me/i, level: 2 });
		expect(aboutMeHeader).toBeVisible();
	});
});
