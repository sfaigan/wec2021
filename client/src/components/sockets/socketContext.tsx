import { createContext } from "react";
import { Store } from "./context";

const SocketContext = createContext<Store>({});

export default SocketContext;
