import React, { createContext } from "react";
import { Store } from "./context";

const SocketContext = createContext<Store>({
  queueLength: 0,
  positionInLine: 0,
  news: "",
});

export default SocketContext;
