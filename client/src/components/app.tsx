import { Box, Grommet, Heading } from "grommet";
import React from "react";
import { Lobby } from "./lobby";
import { SocketProvider } from "./sockets/context";

export const App = (): JSX.Element => {
  return (
    <Grommet full>
      <SocketProvider>
        <Box background="neutral-2" pad="large">
          <Box>
            <Lobby />
          </Box>
        </Box>
      </SocketProvider>
    </Grommet>
  );
};
