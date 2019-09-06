import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import styled from "styled-components";
import { GameContext } from ".";
import { useInterval } from "./_utils";

const Mole = () => {
	const [isActive, setActiveState] = useState(false),
		[delay, setDelay] = useState(setIntervalDuration(1500, 3000)),
		[isRunning, setIsRunning] = useState(true),
		[context] = useContext(GameContext),
		{ timeRemaining, playerScore, updateScore, setCountdownState } = context;

	useInterval(
		() => {
			setActiveState(!isActive);
			setCountdownState(true);
		},
		isRunning ? delay : null
	);

	if (timeRemaining === 0) {
		setIsRunning(false);
		setActiveState(false);
	}

	// Player has successfully whacks a mole
	function moleHit() {
		// Prevent click/tap spamming
		if (isActive) {
			// Increase player's score
			updateScore(playerScore + 1);

			// Have mole descent back underground
			setActiveState(false);

			// For each successful whack, make this mole faster
			const newDelay = 1 - 0.015 * playerScore;

			// Update time taken for mole to re-appear
			setDelay(setIntervalDuration(1800 * newDelay, 3300 * newDelay));
		}
	}

	return (
		<MoleLabel>
			<MoleCheckbox type="checkbox" checked={!isActive} disabled={!isActive} />
			<MoleSprite onMouseDown={moleHit} onTouchStart={moleHit} />
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

	input:checked + & {
		background: blue;
		transform: translate3d(0, 100%, 0);
	}
`;

export default Mole;
