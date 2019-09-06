import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import styled from "styled-components";
import { GameContext } from ".";
// import { useInterval } from "./_utils";

interface IProps {
	id: string;
}

const Mole = (props: IProps) => {
	const [isActive, setActiveState] = useState(true),
		[delay, setDelay] = useState(setIntervalDuration(1500, 3000)),
		[isRunning, setIsRunning] = useState(true),
		[context] = useContext(GameContext),
		{ timeRemaining, playerScore, updateScore, setCountdownState } = context;

	// useInterval(
	// 	() => {
	// 		setActiveState(!isActive);
	// 		setCountdownState(true);
	// 	},
	// 	isRunning ? delay : null
	// );

	// // Hide all moles for good when time is up
	// if (timeRemaining === 0) {
	// 	setIsRunning(false);
	// 	setActiveState(false);
	// }

	// Player has successfully whacks a mole
	function moleHit(e) {
		// Prevent click/tap spamming
		if (isActive) {
			showStars(e);

			// Increase player's score
			updateScore(playerScore + 1);

			// Have mole descend back underground
			// setActiveState(false);

			// For each successful whack, make this mole faster
			const newDelay = 1 - 0.015 * playerScore;

			// Update time taken for mole to re-appear
			setDelay(setIntervalDuration(1800 * newDelay, 3300 * newDelay));
		}
	}

	// Show stars when a mole is hit
	function showStars(e) {
		const starsElement = document.getElementById(props.id);
		starsElement.setAttribute("style", `left: calc(${e.clientX}px - 4rem); opacity: 1; top: calc(${e.clientY}px - 2rem); z-index: ${playerScore + 1}`);
	}

	return (
		<MoleLabel>
			<MoleCheckbox type="checkbox" checked={!isActive} disabled={!isActive} />
			<MoleSprite onMouseDown={e => moleHit(e)} onTouchStart={e => moleHit(e)} />
			<SeeingStars id={props.id} />
		</MoleLabel>
	);
};

// Get time interval between a given range
function setIntervalDuration(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const MoleLabel = styled.label`
	height: 100%;
	overflow: hidden;
	place-self: end center;
`;

const MoleCheckbox = styled.input`
	opacity: 0;
	position: absolute;
	z-index: -1;
`;

const MoleSprite = styled.div`
	background: red;
	cursor: pointer;
	height: 100%;
	max-width: 12rem;
	min-width: 8rem;
	width: calc(15vw + 5rem);

	input + & {
		transform: translate3d(0, 0, 0);
		transition: transform 150ms;
	}

	/* input:checked + & {
		background: blue;
		transform: translate3d(0, 100%, 0);
	} */
`;

const SeeingStars = styled.div`
	background: blue;
	height: 4rem;
	opacity: 0;
	pointer-events: none;
	position: absolute;
	width: 8rem;
`;

export default Mole;
