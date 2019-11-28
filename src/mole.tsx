import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import styled from "styled-components";
import { GameContext } from ".";
import MoleSprite from "./mole-sprite";
import Stars from "./stars";
import Molehill from "./svg/molehill";
import { setRandomNumberByRange, useInterval } from "./_utils";

const Mole = (props: IProps) => {
	const [isActive, setActiveState] = useState(false),
		[isHit, setHitState] = useState(false),
		[delay, setDelay] = useState(setRandomNumberByRange(1500, 3000)),
		[isRunning, setIsRunning] = useState(true),
		[context] = useContext(GameContext),
		{ timeRemaining, playerScore, updateScore, setCountdownState, isMuted } = context,
		{ id, time } = props;

	useInterval(
		() => {
			setActiveState(!isActive);
			setCountdownState(true);
			!isActive ? setHitState(false) : null;
		},
		isRunning ? delay : null
	);

	// Hide all moles for good when time is up
	if (timeRemaining === 0) {
		setIsRunning(false);
		setActiveState(false);

		// Play game over sound (just the once, not once per mole)
		if (id === "mole-1" && !isRunning && !isMuted) {
			setTimeout(() => {
				const gameoverAudio = document.getElementById(`gameover-sfx${setRandomNumberByRange(1, 5)}`) as HTMLAudioElement;
				if (gameoverAudio) {
					gameoverAudio.currentTime = 0;
					gameoverAudio.play();
				}
			}, 300);
		}
	}

	// Player has successfully whacked a mole
	function moleHit(e: MouseEvent | TouchEvent) {
		// Prevent click/tap spamming
		if (isActive) {
			// Visual feedback to user they hit a mole
			setHitState(true);
			showStars(e);

			// Audio feedback to the user they hit a mole
			if (!isMuted) {
				const hitAudio = document.getElementById(`hit-sfx${setRandomNumberByRange(1, 16)}`) as HTMLAudioElement;
				hitAudio.currentTime = 0;
				hitAudio.play();
			}

			// Increase player's score
			updateScore(playerScore + 1);

			// Have mole descend back underground
			setActiveState(false);

			// For each successful whack, make this mole faster
			const newDelay = 1 - 0.015 * playerScore;

			// Update time taken for mole to re-appear
			setDelay(setRandomNumberByRange(1800 * newDelay, 3300 * newDelay));
		}
	}

	// Show stars when a mole is hit
	function showStars(e: MouseEvent | TouchEvent) {
		const starsElement = document.getElementById(id),
			posX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX, // clientX is handled differently on MouseEvent & TouchEvent
			posY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY; // clientY is handled differently on MouseEvent & TouchEvent

		if (starsElement) {
			// Position stars where user hit the mole
			starsElement.setAttribute("style", `left: calc(${posX}px - 4rem); top: calc(${posY}px - 2rem); z-index: ${playerScore + 1}`);
			starsElement.setAttribute("data-active", "");

			// Reset ability to animate once animation is complete
			starsElement.addEventListener("animationend", () => {
				starsElement.removeAttribute("data-active");
			});
		}
	}

	return (
		<MoleLabel>
			<MoleCheckbox type="checkbox" checked={!isActive} disabled={!isActive} />
			<MoleBody onMouseDown={e => moleHit((e as unknown) as MouseEvent)} onTouchStart={e => moleHit((e as unknown) as TouchEvent)}>
				<MoleSprite isHit={isHit} />
			</MoleBody>
			<Stars id={id} />
			<MolehillWrapper>
				<Molehill time={time} />
			</MolehillWrapper>
		</MoleLabel>
	);
};

const MoleLabel = styled.label`
	height: 100%;
	overflow: hidden;
	padding: 0 5%;
	place-self: end center;
`;

const MoleCheckbox = styled.input`
	opacity: 0;
	position: absolute;
	z-index: -1;

	&::before {
		bottom: 0;
		content: "";
		display: block;
		height: 100px;
		position: absolute;
		width: 200px;
	}
`;

const MoleBody = styled.div`
	background: radial-gradient(#767676, #525252);
	border-radius: 5rem 5rem 0 0;
	cursor: pointer;
	height: 100%;
	max-width: 12rem;
	min-width: 8rem;
	overflow: hidden;
	width: calc(15vw + 5rem);

	input + & {
		transform: translate3d(0, 0, 0);
		transition: transform 150ms;
	}

	input:checked + & {
		transform: translate3d(0, 100%, 0);
	}
`;

const MolehillWrapper = styled.div`
	bottom: 0;
	left: -5%;
	position: relative;
	width: 110%;
`;

interface IProps {
	id: string;
	time: number;
}

export default Mole;
