import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { SideMenuButton } from '../components/Share/SideMenu/SideMenuButton/SideMenuButton';

describe('SideMenuButton focus behavior', () => {
	it('removes focus after click to allow menu collapse', async () => {
		const user = userEvent.setup();
		const onClicked = vi.fn();

		render(
			<SideMenuButton label="Home" onClicked={onClicked}>
				<img src="home.svg" alt="Home" />
			</SideMenuButton>
		);

		const button: HTMLButtonElement = screen.getByRole('button', { name: /home/i });
		button.focus();
		expect(button).toHaveFocus();

		await user.click(button);

		expect(onClicked).toHaveBeenCalledTimes(1);
		expect(button).not.toHaveFocus();
	});
});
