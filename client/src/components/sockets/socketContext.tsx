import React, { createContext } from "react";
import { Store } from "./context";

const SocketContext = createContext<Store>({});

export default SocketContext;
