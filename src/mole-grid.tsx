import { Fragment, h } from "preact";
import styled from "styled-components";
import Clock from "./clock";
import Mole from "./mole";
import { Scoreboard } from "./scoreboard";

function MoleGrid() {
	return (
		<Fragment>
			<Clock />
			<Scoreboard />
			<GridArea>
				<Mole id="mole-1" />
				<Mole id="mole-2" />
				<Mole id="mole-3" />
				<Mole id="mole-4" />
				<Mole id="mole-5" />
			</GridArea>
		</Fragment>
	);
}

const GridArea = styled.main`
	display: grid;
	grid-column: 1 / span 2;
	grid-gap: 5vh;
	grid-row: 2;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	height: 100%;
	max-width: 1440px;
	width: 100%;

	*:nth-child(3) {
		grid-column: 1 / span 2;
		grid-row: 2;
	}
`;

export default MoleGrid;
