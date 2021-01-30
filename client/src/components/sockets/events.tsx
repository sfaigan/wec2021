import { Dispatch } from "react";
import { Store } from "./context";
import { socket } from "./sockets";

type Props = {
  setValue: Dispatch<React.SetStateAction<Store>>;
};

export const socketEvents = ({ setValue }: Props): void => {
  socket.on("news", (news: string) => {
    console.log(news);
    setValue((state) => {
      return { ...state, news };
    });
  });

  socket.on("game/pong", (msg: string) => {
    console.log(msg);
  });

  socket.on("game/success", (code: string) => {
    console.log(code);
    setValue((state) => {
      return { ...state, roomId: code };
    });
  });

  socket.on("queueLength", (queueLength: number) => {
    setValue((state) => {
      return { ...state, queueLength };
    });
  });

  socket.on("positionInLine", (positionInLine: number) => {
    setValue((state) => {
      return { ...state, positionInLine };
    });
  });
};
