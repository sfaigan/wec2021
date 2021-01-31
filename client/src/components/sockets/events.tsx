import { Dispatch } from "react";
import { Store } from "./context";
import { socket } from "./sockets";

type Props = {
  setValue: Dispatch<React.SetStateAction<Store>>;
};

export const socketEvents = ({ setValue }: Props): void => {
  socket.on("news", (news: string) => {
    console.log(socket.id);
    setValue((state) => {
      return { ...state, news, socketId: socket.id };
    });
  });

  socket.on("connection", () => {
    setValue((state) => {
      return { ...state, socketId: socket.id };
    });
  });

  socket.on("game/pong", (msg: string) => {
    console.log(msg);
  });

  socket.on("game/success", ({ code }: { code: string }) => {
    console.log(code);
    setValue((state) => {
      return { ...state, roomId: code };
    });
  });
};
