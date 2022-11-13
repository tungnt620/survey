import { Button, useDisclosure } from "@chakra-ui/react";
import RuleModal from "./common/RuleModal.js";

const numberFormatter = new Intl.NumberFormat();

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const ResultScreen = ({ stateMachine, sendMachineEvent }) => {
  const playerEmail = stateMachine.context.email;
  const fieldA = stateMachine.context.fieldA;
  const fieldT = stateMachine.context.fieldT;
  const questions = stateMachine.context.questions;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fieldX = random(1, questions.length + 1);
  const selectedQuestionIndex = fieldX - 1;

  const options = [];
  const amountFromUser =
    stateMachine.context.answer[selectedQuestionIndex].amount;
  const fieldM = questions[selectedQuestionIndex].fieldM;
  for (let i = 5000; i <= fieldM; i = i + 5000) {
    options.push(i);
  }
  const fieldY = options[Math.floor(Math.random() * options.length)];
  const fieldYFormatted = numberFormatter.format(fieldY);
  const fieldMFormatted = numberFormatter.format(fieldM);

  const onNext = () => {
    sendMachineEvent("END");
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col justify-center w-full h-full items-center">
        <div className="pr-16 pl-16">
          <div className="mb-2">
            Câu hỏi được chọn ngẫu nhiên là: <b>{fieldX}</b>
          </div>
          <div className="mb-4">
            Giá trị thăm được rút ngẫu nhiên là: <b>{fieldYFormatted} VND</b>
          </div>
          <div>
            {fieldY >= amountFromUser ? (
              <div>
                Chúng tôi sẽ gửi cho tổ chức{" "}
                <b>
                  {fieldA} {fieldMFormatted} VND
                </b>{" "}
                trong
                {fieldT} ngày. Ban tổ chức sẽ gửi xác nhận đến email{" "}
                {playerEmail} khi khoản tiền này đã được đóng góp cho {fieldA}
              </div>
            ) : (
              <div>
                Chúng tôi sẽ gửi cho bạn <b>{fieldYFormatted} VND</b> bằng tiền
                mặt. Vui lòng đưa màn hình này cho chúng tôi để nhận được tiền
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
          colorScheme="blue"
          className="font-bold text-lg"
        >
          Kết thúc
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

export default ResultScreen;
