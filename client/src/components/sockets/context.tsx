import { useEffect, useState } from "react";
import SocketContext from "./socketContext";
import { initSockets } from "./sockets";

export type Store = {
  queueLength: number;
  positionInLine: number;
};

export const SocketProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [value, setValue] = useState<Store>({
    queueLength: 0,
    positionInLine: 0,
  });
  useEffect(() => initSockets({ setValue }), [initSockets]);

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};
