import { Box, Button, Heading, Paragraph } from "grommet";
import React, { useContext } from "react";
import { useGame } from "../hooks/useGame";
import SocketContext from "./sockets/socketContext";

export const Lobby = (): JSX.Element => {
  const { queueLength, news, roomId } = useContext(SocketContext);

  const { createGame, sendPing } = useGame();

  const handleCreateGame = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    createGame();
  };
  return (
    <Box>
      <Paragraph>Debug</Paragraph>
      <pre>roomId: {roomId || ""}</pre>
      <Button primary onClick={handleCreateGame}>
        Create Game
      </Button>
      <Button primary onClick={() => sendPing("PING")}>
        Ping
      </Button>
    </Box>
  );
};
