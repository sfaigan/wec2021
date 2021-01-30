import React from "react";
import { Lobby } from "./example";
import { SocketProvider } from "./sockets/context";

export const App = (): JSX.Element => {
  return (
    <SocketProvider>
      <div>
        <h1>WEC APP</h1>
        <Lobby />
      </div>
    </SocketProvider>
  );
};
