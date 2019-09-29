import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { GameContext, gameLength } from ".";
import { setRandomNumberByRange } from "./_utils";

const GameOver = () => {
	const [context] = useContext(GameContext),
		{ playerScore, updateScore, setGameOverState, countdown, isMuted } = context;

	return (
		<Fragment>
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
						replayAudio.currentTime = 0;
						replayAudio.play();
					}
				}}
			>
				Again!
			</button>
		</Fragment>
	);
};

export default GameOver;
