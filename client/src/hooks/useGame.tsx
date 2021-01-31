import { useContext } from "react";
import { gameCreate, gameJoin } from "../components/sockets/emit";
import SocketContext from "../components/sockets/socketContext";

export const useGame = (): {
  createGame: () => void;
  joinGame: (code: string) => Promise<void>;
  roomId?: string;
  socketId?: string;
  game?: any;
} => {
  const { socketId, roomId, game } = useContext(SocketContext);

  const createGame = () => {
    console.log("createGame");
    gameCreate(8);
  };

  const joinGame = async (code: string) => {
    console.log("joinGame");
    gameJoin(code);
  };

  return { createGame, joinGame, roomId, socketId, game };
};
