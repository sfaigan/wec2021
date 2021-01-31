import { Box, Grommet, Heading } from "grommet";
import React from "react";
import { Lobby } from "./lobby";
import { SocketProvider } from "./sockets/context";

export const App = (): JSX.Element => {
  return (
    <Grommet>
      <SocketProvider>
        <Box align="center" background="neutral-2">
          <Heading>Radville</Heading>
          <Lobby />
        </Box>
      </SocketProvider>
    </Grommet>
  );
};
