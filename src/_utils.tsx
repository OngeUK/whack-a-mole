import { useEffect, useRef } from "preact/hooks";
import { gameLength } from ".";

// Get a random number between a given range
export function setRandomNumberByRange(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set audio panning depending on where on the screen the mole is positioned
// https://mdn.github.io/webaudio-examples/stereo-panner-node/
export function audioFilePanning(soundId: HTMLAudioElement, moleId: string) {
	/*
	BUGS
	- One play only in Chrome
	- Panning not doing what is wanted 
	*/

	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	// Create a MediaElementAudioSourceNode and feed the HTMLMediaElement into it
	const source = audioCtx.createMediaElementSource(soundId);

	// Create a stereo panner
	const panNode = audioCtx.createStereoPanner();

	// Set the panning position (mole with id 1 or 3 pans to the left, 2 or 4 to the right, 3 has no panning)
	const panValue = moleId === "mole-1" || moleId === "mole-4" ? -1 : moleId === "mole-3" ? 0 : 1;
	panNode.pan.value = panValue;

	// Connect the AudioBufferSourceNode to the gainNode and the gainNode to the destination
	source.connect(panNode);
	panNode.connect(audioCtx.destination);

	// Play the sound
	soundId.currentTime = 0;
	soundId.play();
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
