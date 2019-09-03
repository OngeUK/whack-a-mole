import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { GameContext } from ".";

const GameOver = () => {
	const [context] = useContext(GameContext),
		{ playerScore, updateScore, setGameOverState } = context;

	return (
		<Fragment>
			All done! You scored {playerScore}
			<br />
			<button
				type="button"
				onClick={() => {
					updateScore(0);
					setGameOverState(false);
				}}
			>
				Again!
			</button>
		</Fragment>
	);
};

export default GameOver;
