import { useEffect } from 'react';

export default function useKeydown(key: string, onKeydown: () => void) {
	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === key) onKeydown();
		};

		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	}, [key, onKeydown]);
}
