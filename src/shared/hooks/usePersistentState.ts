import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import LocalStorageService from '../../services/LocalStorageService';

export default function usePersistentState<T>(key: string, defaultValue: T): readonly [T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState<T>(() => {
		const item: T | undefined = LocalStorageService.getItem<T>(key);
		return item ?? defaultValue;
	});

	useEffect(() => {
		LocalStorageService.setItem(key, value);
	}, [key, value]);

	return [value, setValue];
}
