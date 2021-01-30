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
