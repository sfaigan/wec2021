import { useContext } from "react";
import SocketContext from "./sockets/socketContext";

export const Lobby = (): JSX.Element => {
  const { queueLength } = useContext(SocketContext);
  return <div>{queueLength}</div>;
};
