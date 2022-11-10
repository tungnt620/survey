import { Router } from "preact-router";
import "./app.css";
import { ChakraProvider } from "@chakra-ui/react";
import ToastMessage from "./components/common/ToastMessage.jsx";
import { useGetVersion } from "./helpers/index.js";
import { getGameMachine } from "./helpers/stateMachine/gameMachine.js";
import useStateMachine from "@cassiozen/usestatemachine";
import Game from "./components/Game.jsx";

export function App() {
  const version = useGetVersion();
  const machineSchema = getGameMachine({ version });
  const [stateMachine, sendMachineEvent] = useStateMachine(machineSchema);

  console.log({
    stateMachine,
    sendMachineEvent,
  });

  return (
    <ChakraProvider>
      <ToastMessage />
      <Game stateMachine={stateMachine} sendMachineEvent={sendMachineEvent} />
    </ChakraProvider>
  );
}
