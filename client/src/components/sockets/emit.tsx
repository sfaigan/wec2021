import { MoveRequest } from "../board";
import { socket } from "./sockets";

export const addClientToQueue = () => {
  socket.emit("addClientIdToQueue");
};
export const getQueueLength = () => {
  socket.emit("queueLengthToSocket");
};
export const removeUserFromQueue = () => {
  socket.emit("removeUserFromQueue");
};

export const gameCreate = (size: number): void => {
  socket.emit("game/create", { size });
};

export const gameJoin = (code: string): void => {
  socket.emit("game/create", { id: code });
};

export const gameUpdate = (move: MoveRequest, id: string): void => {
  console.log(move, id);
  socket.emit("game/update", { move, id });
};
