import { h } from "preact";
import { useContext } from "preact/hooks";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { GameContext, gameLength } from ".";
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
		} = context;

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
				}, 500);
			}
		}
	}, []);

	const showHighScore = isHighScore && !isFirstPlay ? <HighScore>New high score!!!</HighScore> : null;

	return (
		<GameOverMan>
			All done! You scored {playerScore}
			<br />
			{showHighScore}
			<br />
			<button
				type="button"
				onClick={() => {
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
			>
				Again!
			</button>
		</GameOverMan>
	);
};

const GameOverMan = styled.div`
	align-self: center;
	grid-column: 1 / span 2;
	grid-row: 2;
	justify-self: center;
	text-align: center;
`;

const highScorePulse = keyframes`
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(2);
	}

	100% {
		transform: scale(1);
	}
`;

const HighScore = styled.div`
	animation: ${highScorePulse} linear 350ms 5;
	font-weight: bold;
`;

export default GameOver;
