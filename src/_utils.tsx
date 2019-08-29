import {useEffect, useRef} from "preact/hooks";

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: any, delay: number | null) {
	const savedCallback = useRef();

	// Remember the latest function.
	useEffect(() => {
		// @ts-ignore
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			// @ts-ignore
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export interface Context {
	playerScore: number;
	updateScore: Function;
	gameOver: boolean;
	setGameOverState: Function;
	disableTitleScreen: Function;
}

export const defaultContext: Context = {
	playerScore: 0,
	updateScore: () => {
		return;
	},
	gameOver: false,
	setGameOverState: () => {
		return;
	},
	disableTitleScreen: () => {
		return;
	}
};
