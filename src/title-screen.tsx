import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import { GameContext } from ".";

const TitleScreen = () => {
	const [context] = useContext(GameContext),
		{ disableTitleScreen, isMuted } = context;

	function play() {
		disableTitleScreen(false);

		// Play intro sound
		if (!isMuted) {
			const introAudio = document.getElementById("intro") as HTMLAudioElement;
			introAudio.currentTime = 0;
			introAudio.play();
		}
	}

	return (
		<Fragment>
			<h1>Whack-a-mole!</h1>
			<br />
			<button type="button" onClick={play}>
				Let's go!
			</button>
		</Fragment>
	);
};

// const MoleLabel = styled.label`
// 	overflow: hidden;
// 	place-self: end center;
// `;

export default TitleScreen;
