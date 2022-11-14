import {
  Box,
  Button,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "preact/hooks";
import { MdOutlineAttachMoney } from "react-icons/md";
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

  useEffect(() => {
    setStartTime(new Date().toISOString());
  }, [currentQuestionNo]);

  useEffect(() => {
    setAmount(Math.floor(Math.floor(fieldM / 2) / 5000) * 5000);
  }, [currentQuestionNo, fieldM]);

  const { status, execute, error } = useCreateAnswer({
    playerId: stateMachine.context.playerId,
    amount,
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
            amount,
          },
        });
      } else {
        sendMachineEvent({
          type: "NEXT_QUESTION",
          payload: {
            amount,
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

  const amountFormatted = numberFormatter.format(amount);
  const fieldMFormatted = numberFormatter.format(fieldM);

  const orgChance = Math.floor(((amount - 5000) / (fieldM - 5000)) * 100);
  const yourChance = 100 - orgChance;

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col justify-center w-full h-full items-center">
        <div className="pr-16 pl-16">
          <div className="mb-4">
            <b className={"text-xl"}>Câu {currentQuestionNo}</b>
          </div>
          <div className="mb-4">
            <b>Điền vào chỗ trống:</b>
          </div>
          <div className="mb-4">
            Tôi thấy{" "}
            <Input readonly={true} width="100px" type="number" value={amount} />{" "}
            <b>VND</b> cho tôi ngay ngày hôm nay và <b>{fieldMFormatted} VND</b>{" "}
            cho <b>{fieldA}</b> sau <b>{fieldT} ngày </b> là bằng nhau về giá
            trị.
          </div>
          <div className="mt-16 max-w-screen-md">
            <Slider
              defaultValue={amount}
              value={amount}
              min={5000}
              max={fieldM}
              step={5000}
              onChange={(val) => setAmount(val)}
            >
              <SliderMark
                value={5000}
                mt={2}
                ml={-10}
                fontSize={18}
                fontWeight="bold"
              >
                5,000 VND
              </SliderMark>
              <SliderMark
                value={fieldM}
                mt={2}
                ml={-10}
                fontSize={18}
                width={"120px"}
                fontWeight="bold"
              >
                {fieldMFormatted} VND
              </SliderMark>
              <SliderMark
                value={amount}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-12"
                ml="-16"
                w="32"
                fontSize={18}
                borderRadius={4}
              >
                {amountFormatted} VND
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={8}>
                <Box color="tomato" as={MdOutlineAttachMoney} size={20} />
              </SliderThumb>
            </Slider>

            {version === "A" && (
              <div className="mt-8">
                {/*<div>*/}
                {/*  Xác suất bạn được nhận tiền là <b>{yourChance}%</b>*/}
                {/*</div>*/}
                <div>
                  Xác suất tổ chức thiện nguyện <b>{fieldA}</b> được nhận tiền
                  là <b>{orgChance}%</b>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex mb-4 mr-4 mt-4">
        <div className="pl-16">
          <Button onClick={onOpen} className="font-bold text-lg">
            Xem luật chơi
          </Button>
        </div>
        <div className="flex-1" />
        <Button
          onClick={onNext}
          disabled={!amount || status === "loading"}
          colorScheme="blue"
          className="font-bold text-lg"
        >
          Tiếp theo >>
        </Button>
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
