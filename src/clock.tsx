import {Fragment, h} from "preact";
import {useContext, useState} from "preact/hooks";
import {GameContext} from ".";
import {useInterval} from "./utils";

const Clock = () => {
	const [timeRemaining, countdown] = useState(5),
		[context] = useContext(GameContext),
		{setGameOverState} = context;

	useInterval(
		() => {
			countdown(timeRemaining - 1);

			if (timeRemaining - 1 === 0) {
				// UseRef here?
				setGameOverState(true);
			}
		},
		timeRemaining > 0 ? 1000 : null
	);

	return <Fragment>{timeRemaining}</Fragment>;
};

export default Clock;
