import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { GameContext, gameLength } from ".";

const GameOver = () => {
	const [context] = useContext(GameContext),
		{ playerScore, updateScore, setGameOverState, countdown } = context;

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
				}}
			>
				Again!
			</button>
		</Fragment>
	);
};

export default GameOver;
