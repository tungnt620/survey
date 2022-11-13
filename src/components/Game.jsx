import IntroScreen from "./1.IntroScreen.jsx";
import PlayerInformationScreen from "./2.PlayerInformationScreen.jsx";
import Rule1Screen from "./3.Rule1Screen";
import Rule2Screen from "./4.Rule2Screen.jsx";
import Rule3Screen from "./5.Rule3Screen.jsx";
import QuestionScreen from "./6.QuestionScreen.jsx";
import ResultScreen from "./7.ResultScreen.jsx";

const Game = ({ stateMachine, sendMachineEvent }) => {
  const currentState = stateMachine.value;

  switch (currentState) {
    case "intro":
      return <IntroScreen sendMachineEvent={sendMachineEvent} />;
    case "playerInformation":
      return <PlayerInformationScreen sendMachineEvent={sendMachineEvent} />;
    case "rule1":
      return <Rule1Screen sendMachineEvent={sendMachineEvent} />;
    case "rule2":
      return (
        <Rule2Screen
          stateMachine={stateMachine}
          sendMachineEvent={sendMachineEvent}
        />
      );
    case "rule3":
      return (
        <Rule3Screen
          stateMachine={stateMachine}
          sendMachineEvent={sendMachineEvent}
        />
      );
    case "question":
      return (
        <QuestionScreen
          stateMachine={stateMachine}
          sendMachineEvent={sendMachineEvent}
        />
      );
    case "result":
      return (
        <ResultScreen
          stateMachine={stateMachine}
          sendMachineEvent={sendMachineEvent}
        />
      );
    default:
      return <div>Not found</div>;
  }
};

export default Game;
