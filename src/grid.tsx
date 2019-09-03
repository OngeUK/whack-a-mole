import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import styled from "styled-components";
import Clock from "./clock";
import { GameContext } from "./index";
import Mole from "./mole";

function Grid() {
	const [context] = useContext(GameContext),
		{ playerScore } = context;

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
	grid-gap: 2vh;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	height: 90vh;

	*:nth-child(3) {
		grid-column: 1 / span 2;
		grid-row: 2;
	}
`;

const Scoreboard = styled.div`
	font-weight: bold;
	padding: 1rem;
	position: absolute;
	right: 0;
	top: 0;
`;

export default Grid;
