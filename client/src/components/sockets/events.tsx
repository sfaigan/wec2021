import { Dispatch } from "react";
import { Store } from "./context";
import { socket } from "./sockets";

type Props = {
  setValue: Dispatch<React.SetStateAction<Store>>;
};

export const socketEvents = ({ setValue }: Props): void => {
  socket.on("news", (news: string) => {
    console.log("game/news", news);
    setValue((state) => {
      return { ...state, news, socketId: socket.id };
    });
  });

  socket.on("connection", () => {
    console.log("connection");
    setValue((state) => {
      return { ...state, socketId: socket.id };
    });
  });

  socket.on("game/pong", (msg: string) => {
    console.log("game/pong", msg);
    console.log(msg);
  });

  socket.on("game/success", ({ code, game }: { code: string; game: any }) => {
    console.log("game/success", code, game);
    setValue((state) => {
      return { ...state, roomId: code, game };
    });
  });
};
