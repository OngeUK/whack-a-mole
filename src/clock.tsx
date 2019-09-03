import { Fragment, h } from "preact";
import { useContext, useState } from "preact/hooks";
import { GameContext } from ".";
import { useInterval } from "./_utils";

const Clock = () => {
	const [timeRemaining, countdown] = useState(30),
		[context] = useContext(GameContext),
		{ setGameOverState } = context;

	useInterval(
		() => {
			const newTime = timeRemaining - 1;

			countdown(newTime);

			// Out of time
			if (newTime === 0) {
				setGameOverState(true);
			}
		},
		timeRemaining > 0 ? 1000 : null
	);

	return <Fragment>{timeRemaining}</Fragment>;
};

export default Clock;
