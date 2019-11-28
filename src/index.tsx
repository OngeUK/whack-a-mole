import { createContext, h, render } from "preact";
import { useState } from "preact/hooks";
import { createGlobalStyle } from "styled-components";
import GameOver from "./game-over";
import MoleGrid from "./mole-grid";
import Soundboard from "./soundboard";
import TitleScreen from "./title-screen";
import { defaultContext, IContext } from "./_utils";

export const GameContext = createContext<[IContext]>([defaultContext]);
export const gameLength = 10;

function Game() {
	// Set our states
	const [showTitleScreen, disableTitleScreen] = useState(true),
		[timeRemaining, countdown] = useState(gameLength),
		[playerScore, updateScore] = useState(0),
		[playerHighScore, updateHighScore] = useState(0),
		[isCountdownActive, setCountdownState] = useState(false),
		[isFirstPlay, setFirstPlayState] = useState(true),
		[isGameOver, setGameOverState] = useState(false),
		[isMuted, setMutedState] = useState(true),
		[isHighScore, setHighScoreState] = useState(false);

	// Determine what to render
	const output = showTitleScreen ? <TitleScreen /> : isGameOver ? <GameOver /> : <MoleGrid />;

	return (
		<GameContext.Provider
			value={[
				{
					countdown,
					disableTitleScreen,
					isCountdownActive,
					isGameOver,
					isFirstPlay,
					isMuted,
					isHighScore,
					playerHighScore,
					playerScore,
					setCountdownState,
					setFirstPlayState,
					setGameOverState,
					setMutedState,
					setHighScoreState,
					timeRemaining,
					updateHighScore,
					updateScore
				}
			]}
		>
			<GlobalStyle />
			{output}
			<Soundboard />
		</GameContext.Provider>
	);
}

const GlobalStyle = createGlobalStyle`
	:root {
		--grass: #0fac38;
	}

	html,
	body {
		height: 100vh;
		overflow: hidden;
		overscroll-behavior: none;
		-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
		width: 100%;
	}

	@font-face {
		font-display: "swap";
		font-family: "font";
		font-style: normal;
		font-weight: normal;
		src: url(${require("./../public/font.woff2")}) format("woff2");
	}

	body {
		align-content: center;
		background: var(--grass);
		display: grid;
		font-family: "font";
		font-size: 2rem;
		font-weight: bold;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 1fr auto;
		height: 100%;
		justify-content: center;
		margin: 0;
		min-width: 320px;
	}

	button {
		font-family: "font";
	}
`;

// Remove loader from DOM
let loader = document.getElementById("loader");
if (loader) {
	loader.remove();
	loader = null;
}

// Render our app
const rootElement = document.getElementById("app");
render(<Game />, rootElement as Element);
