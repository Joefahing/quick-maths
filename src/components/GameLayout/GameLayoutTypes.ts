import type { CalculationPanelProps } from '../CalculationPanel/CalculationPanel';
import type { IntroPanelProps } from '../IntroPanel/IntroPanel';
import type { ScorePanelProps } from '../ScorePanel/ScorePanel';

export interface GameOutletContext {
	introPanelProps: IntroPanelProps;
	calculationPanelProps: CalculationPanelProps;
	scorePanelProps: ScorePanelProps;
}
