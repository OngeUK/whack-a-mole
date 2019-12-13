import { createContext, h, render } from "preact";
import { useState } from "preact/hooks";
import { createGlobalStyle } from "styled-components";
import GameOver from "./game-over";
import MoleGrid from "./mole-grid";
import Soundboard from "./soundboard";
import TitleScreen from "./title-screen";
import { defaultContext, IContext, localStorageAvailable } from "./_utils";

export const GameContext = createContext<[IContext]>([defaultContext]);
export const gameLength = 10;
const prevMutedPreference = localStorageAvailable() ? (localStorage.getItem("ismute") === "true" ? true : false) : false;

function Game() {
	// Set our states
	const [showTitleScreen, disableTitleScreen] = useState(true),
		[timeRemaining, countdown] = useState(gameLength),
		[playerScore, updateScore] = useState(0),
		[playerHighScore, updateHighScore] = useState(0),
		[isCountdownActive, setCountdownState] = useState(false),
		[isFirstPlay, setFirstPlayState] = useState(true),
		[isGameOver, setGameOverState] = useState(false),
		[isMuted, setMutedState] = useState(prevMutedPreference),
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
		font-family: "fonty";
		font-style: normal;
		font-weight: normal;
		src: url(${require("./../public/fontyMcFontFace.woff2")}) format("woff2");
	}

	body {
		align-content: center;
		display: grid;
		font-family: "fonty", "Comic Sans MS", "Arial";
		font-size: 2rem;
		font-weight: bold;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 1fr auto;
		height: 100%;
		justify-content: center;
		min-width: 320px;
	}

	button {
		font-family: "fonty", "Comic Sans MS", "Arial";
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
