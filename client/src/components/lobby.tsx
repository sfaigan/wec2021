import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Paragraph,
  TextInput,
} from "grommet";
import React, { useState } from "react";
import { useGame } from "../hooks/useGame";
import { Board } from "./board";

export const Lobby = (): JSX.Element => {
  const [value, setValue] = useState("");

  const { createGame, joinGame, roomId, socketId, game } = useGame();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (event: any) => {
    setValue(event.target.value as string);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (e: any) => {
    e.preventDefault();
    joinGame(value);
  };

  return (
    <Box>
      <Heading>Radville Chess!</Heading>
      <Paragraph>Debug</Paragraph>
      <pre>
        roomId: {roomId || ""}
        socketId: {socketId || ""}
      </pre>
      <Button primary onClick={() => createGame()}>
        Create Game
      </Button>
      <Form onSubmit={onSubmit}>
        <FormField name="name" htmlFor="textinput-id" label="Name">
          <TextInput id="textinput-id" name="name" onChange={onChange} />
        </FormField>
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Submit" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
      {game && roomId && (
        <Box>
          <Paragraph>Game</Paragraph>
          <Board board={game.board} />
        </Box>
      )}
    </Box>
  );
};
