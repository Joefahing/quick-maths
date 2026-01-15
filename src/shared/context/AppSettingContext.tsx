import { type Context, createContext } from 'react';

import { DateStringFormat } from '../services/DateUtilitiesService';

export interface AppSettingContextValue {
	dateKeyFormat: DateStringFormat;
}

export const AppSettingContext: Context<AppSettingContextValue> = createContext<AppSettingContextValue>({
	dateKeyFormat: DateStringFormat.YearMonthDay
});
