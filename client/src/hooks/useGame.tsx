import axios from "axios";
import { useContext } from "react";
import SocketContext from "../components/sockets/socketContext";

export const useGame = (): {
  createGame: () => Promise<void>;
  joinGame: (code: string) => Promise<void>;
  roomId?: string;
  socketId?: string;
} => {
  const { socketId, roomId } = useContext(SocketContext);

  const createGame = async () => {
    console.log(socketId);
    try {
      await axios.post("/api/games", { socketId: socketId });
    } catch (err) {
      console.log(err);
    }
  };

  const joinGame = async (code: string) => {
    try {
      await axios.post(`/api/games/join/${code}`, { socketId: socketId });
    } catch (err) {
      console.log(err);
    }
  };

  return { createGame, joinGame, roomId, socketId };
};
