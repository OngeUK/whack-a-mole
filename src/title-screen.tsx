import { h } from "preact";
import { useContext } from "preact/hooks";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { GameContext } from ".";
import Button from "./button";
import Stars from "./stars";
import { setRandomNumberByRange } from "./_utils";

const TitleScreen = () => {
	const [context] = useContext(GameContext),
		{ disableTitleScreen, isMuted } = context,
		// Randomise time delays
		time = [1000, 1075, 1150, 1225, 1300, 1375, 1450, 1525, 1600, 1675, 1750, 1825, 1900]
			.map(a => ({ sort: Math.random(), value: a }))
			.sort((a, b) => a.sort - b.sort)
			.map(a => a.value);

	useEffect(() => {
		setTimeout(() => {
			setInterval(() => {
				showStars();
			}, 1500);
		}, 1200);
	}, []);

	function showStars() {
		const starsElement = document.getElementById("hp-stars");

		if (starsElement) {
			// Position stars randomly
			starsElement.setAttribute(
				"style",
				`left: calc(${setRandomNumberByRange(40, 60)}% - 4rem);
				top: ${setRandomNumberByRange(30, 60)}%;
				z-index: -1;
				transform: rotate(${setRandomNumberByRange(-20, 20)}deg)`
			);
			starsElement.setAttribute("data-active", "");

			// Reset once animation is complete
			starsElement.addEventListener("animationend", () => {
				starsElement.removeAttribute("data-active");
			});
		}
	}

	function play() {
		disableTitleScreen(false);

		// Play intro sound
		if (!isMuted) {
			const introAudio = document.getElementById("intro") as HTMLAudioElement;
			if (introAudio) {
				introAudio.currentTime = 0;
				introAudio.play();
			}
		}
	}

	return (
		<Title>
			<Heading>
				<Word>
					<Letter delay={time[0]}>W</Letter>
					<Letter delay={time[1]}>h</Letter>
					<Letter delay={time[2]}>a</Letter>
					<Letter delay={time[3]}>c</Letter>
					<Letter delay={time[4]}>k</Letter>
				</Word>
				<br />
				<Word>
					<Letter delay={time[5]}>-</Letter>
					<Letter delay={time[6]}>a</Letter>
					<Letter delay={time[7]}>-</Letter>
				</Word>
				<br />
				<Word>
					<Letter delay={time[8]}>m</Letter>
					<Letter delay={time[9]}>o</Letter>
					<Letter delay={time[10]}>l</Letter>
					<Letter delay={time[11]}>e</Letter>
					<Letter delay={time[12]}>!</Letter>
				</Word>
			</Heading>
			<Button event={play} label="Start" btnDelay={2200} />
			<Stars id="hp-stars" />
		</Title>
	);
};

const Title = styled.main`
	align-self: center;
	font-size: calc(1em + 0.5 * ((100vw - 32em) / 49.25)); /* Responsive text */
	grid-column: 1 / span 2;
	grid-row: 2;
	justify-self: center;
	text-align: center;
`;

const Heading = styled.h1`
	font-size: 3em;
	margin: 0;
	padding: 2rem;
`;

const animateLetters = keyframes`
	0% {
		transform: translate3d(0, 100%, 0);
	}
	100% {
		transform: translate3d(0, 0, 0);
	}
`;

export const Word = styled.span`
	display: inline-block;
	margin: -3rem 0;
	overflow: hidden;
`;

export const Letter = styled.span<ILetter>`
	animation: ${animateLetters} 0.17s ease-out ${(props: ILetter) => props.delay}ms forwards;
	display: inline-block;
	transform: translate3d(0, 100%, 0);
`;

export interface ILetter {
	delay: number;
}

export default TitleScreen;
