import { useEffect, useState } from "react";
import SocketContext from "./socketContext";
import { initSockets } from "./sockets";

export type Store = {
  roomId?: string;
  socketId?: string;
  game?: any;
};

export const SocketProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [value, setValue] = useState<Store>({});
  useEffect(() => {
    initSockets({ setValue });
  }, [initSockets]);

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
