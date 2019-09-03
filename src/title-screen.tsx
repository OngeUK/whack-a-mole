import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { GameContext } from ".";

const TitleScreen = () => {
	const [context] = useContext(GameContext),
		{ disableTitleScreen } = context;

	function play() {
		disableTitleScreen(false);
	}

	return (
		<Fragment>
			<h1>Whack-a-mole!</h1>
			<br />
			<button type="button" onClick={play}>
				Play
			</button>
		</Fragment>
	);
};

// const MoleLabel = styled.label`
// 	overflow: hidden;
// 	place-self: end center;
// `;

export default TitleScreen;
