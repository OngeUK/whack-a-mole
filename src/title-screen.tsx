import { h } from "preact";
import { useContext } from "preact/hooks";
import styled from "styled-components";
import { GameContext } from ".";

const TitleScreen = () => {
	const [context] = useContext(GameContext),
		{ disableTitleScreen, isMuted } = context;

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
			<h1>Whack-a-mole!</h1>
			<br />
			<button type="button" onClick={play}>
				Let's go!
			</button>
		</Title>
	);
};

const Title = styled.main`
	align-self: center;
	grid-column: 1 / span 2;
	grid-row: 2;
	justify-self: center;
	text-align: center;
`;

export default TitleScreen;
