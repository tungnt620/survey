import "./app.css";
import { ChakraProvider } from "@chakra-ui/react";
import ToastMessage from "./components/common/ToastMessage.jsx";
import { useGetVersion } from "./helpers/index.js";
import { getGameMachine } from "./helpers/stateMachine/gameMachine.js";
import useStateMachine from "@cassiozen/usestatemachine";
import Game from "./components/Game.jsx";
import { useMemo } from "preact/hooks";

export function App() {
  const version = useGetVersion();
  const machineSchema = useMemo(() => getGameMachine({ version }), [version]);
  const [stateMachine, sendMachineEvent] = useStateMachine(machineSchema);

  return (
    <ChakraProvider>
      <ToastMessage />
      <Game stateMachine={stateMachine} sendMachineEvent={sendMachineEvent} />
    </ChakraProvider>
  );
}
