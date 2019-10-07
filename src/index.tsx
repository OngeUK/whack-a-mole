// // Enable devtools
// if (process.env.NODE_ENV === "development") {
// 	require("preact/debug");
// }

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
		[isCountdownActive, setCountdownState] = useState(false),
		[isGameOver, setGameOverState] = useState(false),
		[isMuted, setMutedState] = useState(true);

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
					isMuted,
					playerScore,
					setCountdownState,
					setGameOverState,
					setMutedState,
					timeRemaining,
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
		height: 100%;
		overflow: hidden;
		width: 100%;
	}

	body {
		align-content: center;
		display: grid;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto 1fr auto;
		height: 100vh;
		justify-content: center;
		margin: 0;
		min-width: 320px;
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
