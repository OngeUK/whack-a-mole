// Enable devtools
if (process.env.NODE_ENV === "development") {
	require("preact/debug");
}

import { createContext, h, render } from "preact";
import { useState } from "preact/hooks";
import { createGlobalStyle } from "styled-components";
import GameOver from "./game-over";
import Grid from "./grid";
import TitleScreen from "./title-screen";
import { defaultContext, IContext } from "./_utils";

export const GameContext = createContext<[IContext]>([defaultContext]);

function Game() {
	// Set our states
	const [showTitleScreen, disableTitleScreen] = useState(true),
		[playerScore, updateScore] = useState(0),
		[gameOver, setGameOverState] = useState(false);

	// Determine what to render
	const output = showTitleScreen ? <TitleScreen /> : gameOver ? <GameOver /> : <Grid />;

	return (
		<GameContext.Provider value={[{ playerScore, updateScore, gameOver, setGameOverState, disableTitleScreen }]}>
			<GlobalStyle />
			{output}
		</GameContext.Provider>
	);
}

const GlobalStyle = createGlobalStyle`
	html,
	body {
		height: 100%;
		width: 100%;
	}

	body {
		align-content: center;
		display: grid;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
		margin: 0;
	}
`;

// Remove loader from DOM
document.getElementById("loader").remove();

// Render our app
const rootElement = document.getElementById("app");
render(<Game />, rootElement);
