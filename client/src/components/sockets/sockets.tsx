import React from "react";
import type { Dispatch } from "react";
import io from "socket.io-client";
import { Store } from "./context";
import { getQueueLength } from "./emit";
import { socketEvents } from "./events";

export const socket = io();

type Props = {
  setValue: Dispatch<React.SetStateAction<Store>>;
};

export const initSockets = ({ setValue }: Props): void => {
  socketEvents({ setValue });
  // setValue    ^ is passed on to be used by socketEvents
  setValue((state) => {
    return { ...state, socketId: socket.id };
  });
};
