import { h } from "preact";
import { useContext } from "preact/hooks";
import styled from "styled-components";
import { GameContext } from ".";

export const Scoreboard = () => {
	const [context] = useContext(GameContext),
		{ playerScore } = context;

	return <Score>{playerScore}</Score>;
};

const Score = styled.div`
	font-weight: bold;
	padding: 0.5rem 1rem;
	text-align: right;
`;
