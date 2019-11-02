import { h } from "preact";
import { useContext } from "preact/hooks";
import styled from "styled-components";
import { GameContext } from ".";
import { useInterval } from "./_utils";

const Clock = () => {
	const [context] = useContext(GameContext),
		{ timeRemaining, countdown, setGameOverState, isCountdownActive, setCountdownState } = context;

	if (isCountdownActive) {
		useInterval(
			() => {
				const newTime = timeRemaining - 1;

				// Tick down the clock
				countdown(newTime);

				// Out of time!
				if (newTime === 0) {
					setCountdownState(false);

					// TO DO - update this to fire after transitionend
					setTimeout(() => {
						setGameOverState(true);
					}, 1000);
				}
			},
			timeRemaining > 0 ? 1000 : null
		);
	}

	return <Clockface>{timeRemaining}</Clockface>;
};

const Clockface = styled.div`
	font-weight: bold;
	left: 0;
	padding: 0.5rem 1rem;
	top: 0;
`;

export default Clock;
