import { useEffect, useRef } from "preact/hooks";
import { gameLength } from ".";

// Get a random number between a given range
export function setRandomNumberByRange(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

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
			// @ts-ignore
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
	isMuted: boolean;
	playerScore: number;
	setCountdownState: Function;
	setGameOverState: Function;
	setMutedState: Function;
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
	isMuted: false,
	playerScore: 0,
	setCountdownState: () => {
		return;
	},
	setGameOverState: () => {
		return;
	},
	setMutedState: () => {
		return;
	},
	timeRemaining: gameLength,
	updateScore: () => {
		return;
	}
};
