import { Button, Checkbox } from "@chakra-ui/react";
import { useState } from "preact/hooks";
import Rule from "./common/Rule.jsx";

const Rule2Screen = ({ stateMachine, sendMachineEvent }) => {
  const version = stateMachine.context.version;
  const [checked, setChecked] = useState(false);

  const onNext = () => {
    sendMachineEvent("NEXT" + "_" + version.toUpperCase());
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col justify-center w-full h-full">
        <div className="pr-16 pl-16">
          <Rule stateMachine={stateMachine} />
        </div>
      </div>
      <div className="flex mb-4 mr-4 mt-4">
        <div className="pl-16">
          <Checkbox
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          >
            Tôi đã hiểu
          </Checkbox>
        </div>
        <div className="flex-1" />
        <Button
          onClick={onNext}
          disabled={!checked}
          colorScheme="blue"
          className="font-bold text-lg"
        >
          Tiếp theo >>
        </Button>
      </div>
    </div>
  );
};

export default Rule2Screen;
