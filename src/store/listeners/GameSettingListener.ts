import LocalStorageService from '../../shared/services/LocalStorageService';
import { type GameSettingState, toggleOperations } from '../GameSettingSlice';
import { type AppStartListening, listenerMiddleware } from '../store';

const startAppListening = listenerMiddleware.startListening as AppStartListening;

export function registerSettingsListeners() {
	startAppListening({
		actionCreator: toggleOperations,
		effect: async (_, listenerApi) => {
			const gameSettingState: GameSettingState = listenerApi.getState().gameSetting;
			LocalStorageService.setOperations(gameSettingState.selectedOperations);
		}
	});
}
