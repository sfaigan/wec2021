import { Dispatch } from "react";
import { Store } from "./context";
import { socket } from "./sockets";

type Props = {
  setValue: Dispatch<React.SetStateAction<Store>>;
};

export const socketEvents = ({ setValue }: Props): void => {
  socket.on("opponentMoved", ({ position }) => {
    setValue((state) => {
      return { ...state, position };
    });
  });

  socket.on("queueLength", ({ queueLength }) => {
    setValue((state) => {
      return { ...state, queueLength };
    });
  });

  socket.on("positionInLine", ({ positionInLine }) => {
    setValue((state) => {
      return { ...state, positionInLine };
    });
  });
};
