export default class LocalStorageService {
	public static getItem<T>(key: string): T | undefined {
		try {
			const item: string | null = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : undefined;
		} catch {
			return undefined;
		}
	}

	public static setItem<T>(key: string, item: T): T | undefined {
		try {
			window.localStorage.setItem(key, JSON.stringify(item));
			return item;
		} catch {
			return undefined;
		}
	}
}
