import { useContext } from "react";
import SocketContext from "../components/sockets/socketContext";
import { socket } from "../components/sockets/sockets";

export const useGame = (): {
  createGame: () => null;
  sendPing: (msg: string) => void;
} => {
  const { queueLength, news, roomId } = useContext(SocketContext);

  const createGame = () => {
    socket.emit("game/create");
    return null;
  };

  const sendPing = (msg: string) => {
    if (roomId) {
      socket.emit("game/ping", { msg });
    }
  };

  return { createGame, sendPing };
};
