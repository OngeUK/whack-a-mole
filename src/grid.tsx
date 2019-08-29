import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import styled from "styled-components";
import Clock from "./clock";
import { GameContext } from "./index";
import Mole from "./mole";

function Grid() {
	const [context] = useContext(GameContext),
		{playerScore} = context;

	return (
		<Fragment>
			<Clock />
			<Scoreboard>{playerScore}</Scoreboard>
			<GridArea>
				<Mole />
				<Mole />
				<Mole />
				<Mole />
				<Mole />
			</GridArea>
		</Fragment>
	);
}

const GridArea = styled.main`
	display: grid;
	grid-template-rows: 1fr 1fr 1fr;
	grid-template-columns: 1fr 1fr;
	height: 90vh;
	grid-gap: 2vh;

	*:nth-child(3) {
		grid-row: 2;
		grid-column: 1 / span 2;
	}
`;

const Scoreboard = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	font-weight: bold;
	padding: 1rem;
`;

export default Grid;
