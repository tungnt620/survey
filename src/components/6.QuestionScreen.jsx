import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "preact/hooks";
import RuleModal from "./common/RuleModal.js";
import { useCreateAnswer } from "../api/index.js";
import { toastStore } from "../store/toast.js";

const numberFormatter = new Intl.NumberFormat();

const QuestionScreen = ({ stateMachine, sendMachineEvent }) => {
  const fieldA = stateMachine.context.fieldA;
  const questions = stateMachine.context.questions;
  const currentQuestionNo = stateMachine.context.currentQuestionNo;
  const currentQuestionIndex = currentQuestionNo - 1;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fieldM = questions[currentQuestionIndex].fieldM;
  const fieldT = questions[currentQuestionIndex].fieldT;

  const version = stateMachine.context.version;
  const [amount, setAmount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [forceNextBtnDisable, setForceNextBtnDisable] = useState(!window.debug);

  useEffect(() => {
    setTimeout(() => {
      setForceNextBtnDisable(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setStartTime(new Date().toISOString());
  }, [currentQuestionNo]);

  useEffect(() => {
    setAmount(fieldM);
  }, [currentQuestionNo, fieldM]);

  const { status, execute, error } = useCreateAnswer({
    playerId: stateMachine.context.playerId,
    amount: parseInt(amount),
    fieldM,
    fieldT,
    questionNo: currentQuestionNo,
    startTime,
    endTime: new Date().toISOString(),
  });

  useEffect(() => {
    if (status === "success") {
      if (currentQuestionNo === questions.length) {
        sendMachineEvent({
          type: "FINISH",
          payload: {
            amount: parseInt(amount),
          },
        });
      } else {
        sendMachineEvent({
          type: "NEXT_QUESTION",
          payload: {
            amount: parseInt(amount),
          },
        });
      }
    } else if (status === "error") {
      toastStore.value = {
        message: error.message,
        type: "error",
      };
    }
  }, [status]);

  const onNext = () => {
    execute();
  };

  const fieldMFormatted = numberFormatter.format(fieldM);

  const orgChance = Math.floor(((amount - 5000) / (fieldM - 5000)) * 100);

  return (
    <div className="flex flex-col w-full h-screen p-2 items-center">
      <div className="flex flex-col justify-center w-full h-full items-center max-w-4xl">
        <div className="">
          <div className="mb-4 text-xl flex justify-center">
            <b className={"text-3xl"}>
              Câu <span className="text-4xl">{currentQuestionNo}</span>
            </b>
          </div>
          <div className="mb-4">
            <b>Điền vào chỗ trống:</b>
          </div>
          <div className="mb-4">
            Tôi thấy{" "}
            <NumberInput
              value={amount}
              step={5000}
              min={5000}
              max={fieldM}
              onChange={(valueString) => setAmount(valueString)}
              onKeyPress={(e) => {
                if (e.key === "e") {
                  e.preventDefault();
                }
              }}
              onBlur={(e) => {
                const intValue = parseInt(e.target.value);

                if (intValue >= 5000 && intValue <= fieldM) {
                  setAmount(Math.round(intValue / 5000) * 5000);
                }
              }}
              size={"lg"}
              allowMouseWheel
              className={"border-blue-500 inline-flex"}
              width={140}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>{" "}
            <b>VND</b> cho tôi ngay ngày hôm nay và{" "}
            <b className="text-xl text-blue-500">{fieldMFormatted} VND</b> cho{" "}
            {fieldA} sau <b className="text-xl text-blue-500">{fieldT} ngày </b>{" "}
            là bằng nhau về giá trị.
          </div>
          <div className="italic text-sm mt-8">
            Các giá trị sẽ được làm tròn thành 5,000 VND gần nhất (vd: 13000 ->
            15000; 11000 -> 10000)
          </div>
          {version === "A" && (
            <div className="mt-8">
              <div>
                Xác suất tổ chức thiện nguyện <b>{fieldA}</b> được nhận tiền là{" "}
                <b>{orgChance}%</b>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex mb-4 mt-4 w-full justify-between">
        <div className="">
          <Button size={"lg"} onClick={onOpen} className="font-bold text-lg">
            Xem luật chơi
          </Button>
        </div>
        <div className="flex-1" />
        <Button
          size={"lg"}
          onClick={onNext}
          disabled={!amount || status === "loading" || forceNextBtnDisable}
          colorScheme="blue"
          className="font-bold text-lg"
        >
          Tiếp theo >>
        </Button>
      </div>
      <div className="w-full">
        <Progress hasStripe value={currentQuestionNo} max={questions.length} />
      </div>
      <RuleModal
        stateMachine={stateMachine}
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default QuestionScreen;
