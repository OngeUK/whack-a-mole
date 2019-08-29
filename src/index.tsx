import {createContext, h, render} from "preact";
import "preact/debug";
import {useState} from "preact/hooks";
import {createGlobalStyle} from "styled-components";
import GameOver from "./game-over";
import Grid from "./grid";
import TitleScreen from "./title-screen";
import {Context, defaultContext} from "./_utils";

export const GameContext = createContext<[Context]>([defaultContext]);

function Game() {
	// Set our states
	const [showTitleScreen, disableTitleScreen] = useState(true),
		[playerScore, updateScore] = useState(0),
		[gameOver, setGameOverState] = useState(false);

	// Determine what to render
	const output = showTitleScreen ? <TitleScreen /> : gameOver ? <GameOver /> : <Grid />;

	return (
		<GameContext.Provider value={[{playerScore, updateScore, gameOver, setGameOverState, disableTitleScreen}]}>
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
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		margin: 0;
		display: grid;
		align-content: center;
	}
`;

const rootElement = document.getElementById("root");
render(<Game />, rootElement);
