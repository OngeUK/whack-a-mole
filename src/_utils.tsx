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

// Check if local storage is available
export function localStorageAvailable(): boolean {
	const mod: string = "test";

	try {
		localStorage.setItem(mod, mod);
		localStorage.removeItem(mod);
		return true;
	} catch (e) {
		return false;
	}
}

interface ISavedCallback {
	current?: Function;
}

export interface IContext {
	countdown: Function;
	disableTitleScreen: Function;
	isCountdownActive: boolean;
	isGameOver: boolean;
	isFirstPlay: boolean;
	isMuted: boolean;
	isHighScore: boolean;
	playerHighScore: number;
	playerScore: number;
	setCountdownState: Function;
	setFirstPlayState: Function;
	setGameOverState: Function;
	setMutedState: Function;
	setHighScoreState: Function;
	timeRemaining: number;
	updateHighScore: Function;
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
	isFirstPlay: true,
	isGameOver: false,
	isMuted: false,
	isHighScore: false,
	playerHighScore: 0,
	playerScore: 0,
	setCountdownState: () => {
		return;
	},
	setFirstPlayState: () => {
		return;
	},
	setGameOverState: () => {
		return;
	},
	setMutedState: () => {
		return;
	},
	setHighScoreState: () => {
		return;
	},
	timeRemaining: gameLength,
	updateHighScore: () => {
		return;
	},
	updateScore: () => {
		return;
	}
};

export interface IHitState {
	glassesNum?: number;
	hitMouth?: number;
	isHit?: boolean;
	isFemale?: boolean;
	monocleNum?: number;
	mouth?: number;
	tashNum?: number;
}
