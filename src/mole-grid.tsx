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
				<Mole id="mole-1" time={0} />
				<Mole id="mole-2" time={0.2} />
				<Mole id="mole-3" time={0.4} />
				<Mole id="mole-4" time={0.6} />
				<Mole id="mole-5" time={0.8} />
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
	justify-self: center;
	max-width: 1440px;
	width: 100%;

	*:nth-child(3) {
		grid-column: 1 / span 2;
		grid-row: 2;
	}
`;

export default MoleGrid;
