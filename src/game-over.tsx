import { h } from "preact";
import { useContext } from "preact/hooks";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { GameContext, gameLength } from ".";
import Button from "./button";
import { ILetter, Letter, Word } from "./title-screen";
import { setRandomNumberByRange } from "./_utils";

const GameOver = () => {
	const [context] = useContext(GameContext),
		{
			playerScore,
			updateScore,
			setGameOverState,
			countdown,
			isMuted,
			playerHighScore,
			updateHighScore,
			isHighScore,
			setHighScoreState,
			isFirstPlay,
			setFirstPlayState
		} = context,
		// Randomise time delays
		time = [0, 75, 150, 225, 300, 375, 450, 525, 600, 675, 750, 825, 900, 975, 1050, 1125, 1200]
			.map(a => ({ sort: Math.random(), value: a }))
			.sort((a, b) => a.sort - b.sort)
			.map(a => a.value);

	useEffect(() => {
		// Has the player got a high score?
		if (playerScore > playerHighScore) {
			updateHighScore(playerScore);
			setHighScoreState(true);

			// Play congratulatory sound
			if (!isMuted && !isFirstPlay) {
				setTimeout(() => {
					const highScoreAudio = document.getElementById(`highscore-sfx${setRandomNumberByRange(1, 6)}`) as HTMLAudioElement;
					if (highScoreAudio) {
						highScoreAudio.currentTime = 0;
						highScoreAudio.play();
					}
				}, 2300);
			}
		}
	}, []);

	const showHighScore =
		isHighScore && !isFirstPlay ? (
			<HighScore>
				<DancingLetter delay={0}>N</DancingLetter>
				<DancingLetter delay={250}>e</DancingLetter>
				<DancingLetter delay={0}>w</DancingLetter> <DancingLetter delay={250}>h</DancingLetter>
				<DancingLetter delay={0}>i</DancingLetter>
				<DancingLetter delay={250}>g</DancingLetter>
				<DancingLetter delay={0}>h</DancingLetter> <DancingLetter delay={250}>s</DancingLetter>
				<DancingLetter delay={0}>c</DancingLetter>
				<DancingLetter delay={250}>o</DancingLetter>
				<DancingLetter delay={0}>r</DancingLetter>
				<DancingLetter delay={250}>e</DancingLetter>
			</HighScore>
		) : null;

	return (
		<GameOverMan>
			<Word>
				<Letter delay={time[0]}>A</Letter>
				<Letter delay={time[1]}>l</Letter>
				<Letter delay={time[2]}>l</Letter>
			</Word>{" "}
			<Word>
				<Letter delay={time[3]}>d</Letter>
				<Letter delay={time[4]}>o</Letter>
				<Letter delay={time[5]}>n</Letter>
				<Letter delay={time[6]}>e</Letter>
				<Letter delay={time[7]}>!</Letter>
			</Word>
			<br />
			<Word>
				<Letter delay={time[8]}>Y</Letter>
				<Letter delay={time[9]}>o</Letter>
				<Letter delay={time[10]}>u</Letter>
			</Word>{" "}
			<Word>
				<Letter delay={time[11]}>s</Letter>
				<Letter delay={time[12]}>c</Letter>
				<Letter delay={time[13]}>o</Letter>
				<Letter delay={time[14]}>r</Letter>
				<Letter delay={time[15]}>e</Letter>
				<Letter delay={time[16]}>d</Letter>
			</Word>{" "}
			<Scored>
				<Word>
					<Letter delay={1775}>{playerScore.toString().split("")[0]}</Letter>
					<Letter delay={1850}>{playerScore.toString().split("")[1]}</Letter>
				</Word>
			</Scored>
			<br />
			{showHighScore}
			<br />
			<Button
				label="Again"
				event={() => {
					updateScore(0);
					setGameOverState(false);
					setHighScoreState(false);
					setFirstPlayState(false);
					countdown(gameLength);

					// Play replay audio
					if (!isMuted) {
						const replayAudio = document.getElementById(`replay${setRandomNumberByRange(1, 5)}`) as HTMLAudioElement;
						if (replayAudio) {
							replayAudio.currentTime = 0;
							replayAudio.play();
						}
					}
				}}
				btnDelay={2000}
			/>
		</GameOverMan>
	);
};

const GameOverMan = styled.div`
	align-self: center;
	font-size: calc(1.5em + 0.5 * ((100vw - 32em) / 49.25)); /* Responsive text */
	grid-column: 1 / span 2;
	grid-row: 2;
	justify-self: center;
	line-height: 1;
	text-align: center;
`;

const Scored = styled.div`
	font-size: calc(4em + 0.5 * ((100vw - 32em) / 49.25)); /* Responsive text */
`;

const highScorePulse = keyframes`
	0% {
		opacity: 0;
	}

	100% {
		opacity: 1;
	}
`;

const HighScore = styled.div`
	animation: ${highScorePulse} linear 350ms forwards 2s;
	font-weight: bold;
	opacity: 0;
`;

const DancingLetters = keyframes`
	0% {
		transform: translate3d(0, -5%, 0);
	}

	50% {
		transform: translate3d(0, 5%, 0);
	}

	100% {
		transform: translate3d(0, -5%, 0);
	}
`;

const DancingLetter = styled.span`
	animation: ${DancingLetters} 500ms ease-in-out ${(props: ILetter) => props.delay}ms infinite;
	display: inline-block;
`;

export default GameOver;
