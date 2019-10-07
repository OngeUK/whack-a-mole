import { h } from "preact";
import { useContext } from "preact/hooks";
import styled from "styled-components";
import { GameContext, gameLength } from ".";
import { setRandomNumberByRange } from "./_utils";

const GameOver = () => {
	const [context] = useContext(GameContext),
		{ playerScore, updateScore, setGameOverState, countdown, isMuted } = context;

	return (
		<GameOverMan>
			All done! You scored {playerScore}
			<br />
			<button
				type="button"
				onClick={() => {
					updateScore(0);
					setGameOverState(false);
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

export default GameOver;
