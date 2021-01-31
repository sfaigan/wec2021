import { useEffect, useState } from "react";
import SocketContext from "./socketContext";
import { initSockets } from "./sockets";

export type Store = {
  roomId?: string;
  socketId?: string;
};

export const SocketProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [value, setValue] = useState<Store>({});
  useEffect(() => {
    initSockets({ setValue });
    console.log(value);
  }, [initSockets]);

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
