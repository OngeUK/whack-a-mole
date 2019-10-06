import { h } from "preact";
import { useContext, useState } from "preact/hooks";
import styled, { keyframes } from "styled-components";
import { GameContext } from ".";
import { setRandomNumberByRange, useInterval } from "./_utils";

interface IProps {
	id: string;
}

const Mole = (props: IProps) => {
	const [isActive, setActiveState] = useState(false),
		[delay, setDelay] = useState(setRandomNumberByRange(1500, 3000)),
		[isRunning, setIsRunning] = useState(true),
		[context] = useContext(GameContext),
		{ timeRemaining, playerScore, updateScore, setCountdownState, isMuted } = context,
		{ id } = props;

	useInterval(
		() => {
			setActiveState(!isActive);
			setCountdownState(true);
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
			<MoleSprite onMouseDown={e => moleHit((e as unknown) as MouseEvent)} onTouchStart={e => moleHit((e as unknown) as TouchEvent)} />
			<SeeingStars id={id} angle={setRandomNumberByRange(-20, 20)}>
				<Star type="left" />
				<Star type="middle" />
				<Star type="right" />
			</SeeingStars>
		</MoleLabel>
	);
};

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
		transform: translate3d(0, 100%, 0);
	}
`;

const hit = keyframes`
	from {
		opacity: 1;
	}

	to {
		opacity: 0;
	}
`;

const SeeingStars = styled.div<ISeeingStars>`
	align-items: center;
	display: flex;
	height: 3rem;
	justify-content: center;
	opacity: 0;
	pointer-events: none;
	position: absolute;
	width: 9rem;

	&[data-active] {
		animation: ${hit} 0.3s linear;
		transform: rotate(${(props: ISeeingStars) => props.angle}deg);
	}
`;

const animateLeftStar = keyframes`
	from {
		opacity: 1;
		transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
	}

	to {
		opacity: 0;
		transform: translate3d(-150%, 0, 0) rotate(270deg) scale(0);
	}
`;

const animateMiddleStar = keyframes`
	from {
		opacity: 1;
		transform: rotate(0deg) scale(1);
	}

	to {
		opacity: 0;
		transform: rotate(270deg) scale(0);
	}
`;

const animateRightStar = keyframes`
	from {
		opacity: 1;
		transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
	}

	to {
		opacity: 0;
		transform: translate3d(150%, 0, 0) rotate(270deg) scale(0);
	}
`;

const Star = styled.span<IStar>`
	background: yellow;
	border: 2px solid #000;
	display: block;
	height: ${(props: IStar) => (props.type === "middle" ? "2.5rem" : "1.25rem")};
	margin: 0 0.25rem;
	width: ${(props: IStar) => (props.type === "middle" ? "2.5rem" : "1.25rem")};

	div[data-active] & {
		animation: ${(props: IStar) => {
				if (props.type === "left") {
					return animateLeftStar;
				}

				if (props.type === "middle") {
					return animateMiddleStar;
				}

				if (props.type === "right") {
					return animateRightStar;
				}
			}}
			0.3s linear;
	}
`;

interface IStar {
	type: string;
}

interface ISeeingStars {
	angle: number;
}

export default Mole;
