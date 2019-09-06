import { useEffect, useRef } from "preact/hooks";
import { gameLength } from ".";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: any, delay: number | null) {
	const savedCallback: ISavedCallback = useRef();

	// Remember the latest function.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

interface ISavedCallback {
	current?: Function;
}

export interface IContext {
	countdown: Function;
	disableTitleScreen: Function;
	isCountdownActive: boolean;
	isGameOver: boolean;
	playerScore: number;
	setGameOverState: Function;
	setCountdownState: Function;
	timeRemaining: number;
	updateScore: Function;
}

export const defaultContext: IContext = {
	countdown: () => {
		return;
	},
	disableTitleScreen: () => {
		return;
	},
	isCountdownActive: false,
	isGameOver: false,
	playerScore: 0,
	setCountdownState: () => {
		return;
	},
	setGameOverState: () => {
		return;
	},
	timeRemaining: gameLength,
	updateScore: () => {
		return;
	}
};
