import { Box, Grommet, Heading } from "grommet";
import React from "react";
import { Board } from "./board";
import { Lobby } from "./example";
import { SocketProvider } from "./sockets/context";

const data = [
  ["W", "B"],
  ["B", "W"],
];

export const App = (): JSX.Element => {
  return (
    <Grommet>
      <SocketProvider>
        <Box align="center" background="neutral-2">
          <Heading>Radville</Heading>
          <Lobby />
          {/* <Board boardData={data} /> */}
        </Box>
      </SocketProvider>
    </Grommet>
  );
};
