import { Fragment, h } from "preact";
import { useContext } from "preact/hooks";
import styled, { keyframes } from "styled-components";
import { GameContext } from ".";

const Soundboard = () => {
	const [context] = useContext(GameContext),
		{ setMutedState, isMuted } = context,
		checkedState = isMuted ? { checked: true } : null;

	return (
		<Fragment>
			<MuteLabel htmlFor="mute">
				<span>Shhhh!</span>
				<input
					type="checkbox"
					id="mute"
					value="Mute"
					onChange={e => {
						if ((e.target as HTMLInputElement).checked) {
							setMutedState(true);
							localStorage.setItem("ismute", "true");
						} else {
							setMutedState(false);
							localStorage.setItem("ismute", "false");
						}
					}}
					{...checkedState}
				/>
				<Tickbox xmlns="http://www.w3.org/2000/svg" width="72.5" height="51" viewBox="0 0 72.5 51">
					<path
						fill="#054014"
						d="M64 18.5C63.079 10.87 62.739 2.559 53.711.748 48.398-.318 42.643.61 37.261.473 33.18.369 29.121.078 25.035.18 19.124.326 10.221 1.399 8.029 8.064c-1.547 4.703-.434 10.274-.001 15.084.63 6.997.478 14.091.222 21.102-.125 3.419 5.029 4.042 5.893.798.259-.975.217-2.145.697-3.034l-5.483-2.312c-.629 2.36-1.51 4.365.046 6.547 1.618 2.271 4.523 3.084 7.118 3.601 7.011 1.396 14.586.623 21.689.734 7.303.114 20.089 1.971 24.84-5.215 1.599-2.418 1.3-6.014 1.347-8.754.104-6.098.381-12.036-.397-18.115-.484-3.783-6.49-3.831-6 0 .907 7.085.547 14.145.331 21.259-.21 6.937-13.52 4.889-18.306 4.85-5.425-.045-10.866.044-16.29-.075-2.542-.056-5.058-.279-7.528-.896-1.48-.37-1.356-1.244-1.821.497l.757-2.837c.867-3.25-3.842-5.351-5.483-2.312-.857 1.586-.878 2.874-1.303 4.466 1.964.267 3.929.532 5.893.798.337-9.271-.105-18.357-.774-27.594-.23-3.182-.831-6.805 2.234-8.669 2.646-1.611 6.335-1.677 9.325-1.807 5.78-.25 11.572.374 17.358.276 3.821-.064 10.148-1.235 13.227 1.554 2.361 2.14 2.036 7.632 2.38 10.49.458 3.792 6.463 3.836 6 0z"
					/>
					<g style={{ fill: "var(--grass)" }}>
						<path d="M14.156 39.188c-.04.545-.032 1.084-.086 1.63-.066.666-.004 1.374.354 1.955.778 1.265 2.786.756 2.795-.757l.02-3.248c.01-1.666-2.593-2.081-2.946-.398a8.423 8.423 0 00-.083.42c-.148.803.208 1.614 1.047 1.845.736.202 1.697-.243 1.845-1.048.024-.141.052-.28.083-.42l-2.946-.398-.02 3.248 2.795-.757c.042.067.049.451.031.068-.011-.225.019-.455.042-.679.049-.488.034-.973.069-1.461.06-.816-.728-1.5-1.5-1.5-.863 0-1.44.684-1.5 1.5z" />
						<path d="M14.25 36.922l-.011 1.846c-.01 1.661 2.612 2.088 2.946.398.151-.763.155-1.476.065-2.244-.095-.812-.61-1.5-1.5-1.5-.746 0-1.595.685-1.5 1.5.057.489.11 1.106.042 1.447l2.946.398.011-1.846c.013-1.935-2.987-1.933-2.999.001z" />
					</g>
					<path
						class="tick"
						d="M20.879 29.621c3.85 2.989 7.956 5.638 11.5 9 1.14 1.082 3.124 1.236 4.242 0 9.88-10.92 21.561-19.479 34.143-27.031 3.313-1.988.298-7.177-3.028-5.181-12.996 7.801-25.152 16.689-35.357 27.97h4.242c-3.556-3.374-7.64-6.003-11.5-9-3.016-2.342-7.295 1.872-4.242 4.242z"
					/>
				</Tickbox>
			</MuteLabel>
			<audio id="intro" preload="true" src={require("./../public/audio/intro.mp3")} />
			<audio id="hit-sfx1" preload="true" src={require("./../public/audio/eee.mp3")} />
			<audio id="hit-sfx2" preload="true" src={require("./../public/audio/eep.mp3")} />
			<audio id="hit-sfx3" preload="true" src={require("./../public/audio/ergh.mp3")} />
			<audio id="hit-sfx4" preload="true" src={require("./../public/audio/mummy.mp3")} />
			<audio id="hit-sfx5" preload="true" src={require("./../public/audio/oof.mp3")} />
			<audio id="hit-sfx6" preload="true" src={require("./../public/audio/ooo.mp3")} />
			<audio id="hit-sfx7" preload="true" src={require("./../public/audio/ooo2.mp3")} />
			<audio id="hit-sfx8" preload="true" src={require("./../public/audio/ouch.mp3")} />
			<audio id="hit-sfx9" preload="true" src={require("./../public/audio/ow.mp3")} />
			<audio id="hit-sfx10" preload="true" src={require("./../public/audio/waa.mp3")} />
			<audio id="hit-sfx11" preload="true" src={require("./../public/audio/waa2.mp3")} />
			<audio id="hit-sfx12" preload="true" src={require("./../public/audio/whatthe.mp3")} />
			<audio id="hit-sfx13" preload="true" src={require("./../public/audio/ya.mp3")} />
			<audio id="hit-sfx14" preload="true" src={require("./../public/audio/doh.mp3")} />
			<audio id="hit-sfx15" preload="true" src={require("./../public/audio/meanie.mp3")} />
			<audio id="hit-sfx16" preload="true" src={require("./../public/audio/ouchie.mp3")} />
			<audio id="gameover-sfx1" preload="true" src={require("./../public/audio/enough.mp3")} />
			<audio id="gameover-sfx2" preload="true" src={require("./../public/audio/gameoverman.mp3")} />
			<audio id="gameover-sfx3" preload="true" src={require("./../public/audio/retreat.mp3")} />
			<audio id="gameover-sfx4" preload="true" src={require("./../public/audio/runaway.mp3")} />
			<audio id="gameover-sfx5" preload="true" src={require("./../public/audio/surrender.mp3")} />
			<audio id="highscore-sfx1" preload="true" src={require("./../public/audio/congrats.mp3")} />
			<audio id="highscore-sfx2" preload="true" src={require("./../public/audio/highscore.mp3")} />
			<audio id="highscore-sfx3" preload="true" src={require("./../public/audio/impressive.mp3")} />
			<audio id="highscore-sfx4" preload="true" src={require("./../public/audio/welldone.mp3")} />
			<audio id="highscore-sfx5" preload="true" src={require("./../public/audio/woah.mp3")} />
			<audio id="highscore-sfx6" preload="true" src={require("./../public/audio/youthebest.mp3")} />
			<audio id="replay1" preload="true" src={require("./../public/audio/bringiton.mp3")} />
			<audio id="replay2" preload="true" src={require("./../public/audio/gameon.mp3")} />
			<audio id="replay3" preload="true" src={require("./../public/audio/letsdothis.mp3")} />
			<audio id="replay4" preload="true" src={require("./../public/audio/letsgo.mp3")} />
			<audio id="replay5" preload="true" src={require("./../public/audio/yoreadyforthis.mp3")} />
		</Fragment>
	);
};

const showMuteButton = keyframes`
	0% {
		transform: translate3d(0, 100%, 0);
	}
	100% {
		transform: translate3d(0, 0, 0);
	}
`;

const MuteLabel = styled.label`
	align-items: center;
	animation: ${showMuteButton} 300ms ease-out 2250ms forwards;
	display: flex;
	font-size: 1.5rem;
	grid-column: 2;
	grid-row: 3;
	justify-content: flex-end;
	padding: 0.5rem 1rem;
	text-align: right;
	transform: translate3d(0, 100%, 0);

	input {
		left: -999rem;
		position: absolute;
		top: -999rem;

		&:checked + svg {
			.tick {
				opacity: 1;
			}
		}
	}
`;

const Tickbox = styled.svg`
	height: 20px;
	margin-right: -4px;
	padding-left: 5px;
	width: 28px;

	.tick {
		opacity: 0;
	}
`;

export default Soundboard;
