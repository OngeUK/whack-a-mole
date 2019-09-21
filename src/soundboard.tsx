import { Fragment, h } from "preact";

const Soundboard = () => {
	return (
		<Fragment>
			<audio id="hit-sfx1" preload="true" src={require("./../public/audio/test1.mp3")} />
			<audio id="hit-sfx2" preload="true" src={require("./../public/audio/test2.mp3")} />
		</Fragment>
	);
};

export default Soundboard;
