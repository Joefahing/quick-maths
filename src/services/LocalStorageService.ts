export default class LocalStorageService {
	public static getItem<T>(key: string): T | undefined {
		try {
			const item: string | null = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : undefined;

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			return undefined;
		}
	}

	public static setItem<T>(key: string, item: T): void {
		try {
			window.localStorage.setItem(key, JSON.stringify(item));
		} catch (error) {
			console.log(error);
		}
	}
}
