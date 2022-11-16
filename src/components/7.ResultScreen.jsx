import { useUpdatePlayerInfo } from "../api/index.js";
import { useEffect, useMemo } from "preact/hooks";
import { toastStore } from "../store/toast.js";
import { Input } from "@chakra-ui/react";

const numberFormatter = new Intl.NumberFormat();

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const ResultScreen = ({ stateMachine, sendMachineEvent }) => {
  const playerEmail = stateMachine.context.email;
  const fieldA = stateMachine.context.fieldA;
  const questions = stateMachine.context.questions;
  const answers = stateMachine.context.answer;

  const fieldX = useMemo(() => random(1, questions.length + 1), []);
  const selectedQuestionIndex = fieldX - 1;

  const amountFromUser =
    answers.length === questions.length
      ? answers[selectedQuestionIndex].amount
      : 0;
  const fieldM = questions[selectedQuestionIndex].fieldM;
  const fieldT = questions[selectedQuestionIndex].fieldT;

  const fieldY = useMemo(() => {
    const options = [];
    for (let i = 5000; i <= fieldM; i = i + 5000) {
      options.push(i);
    }
    return options[Math.floor(Math.random() * options.length)];
  }, []);

  const fieldYFormatted = numberFormatter.format(fieldY);
  const fieldMFormatted = numberFormatter.format(fieldM);

  const isSendToOrg = fieldY <= amountFromUser;

  const { status, execute, error } = useUpdatePlayerInfo(
    stateMachine.context.playerId,
    {
      selectedQuestionNo: fieldX,
      fieldY,
      fieldM,
      amountFromUser,
      fieldT,
      decision: isSendToOrg ? "sendToOrg" : "sendToUser",
    }
  );

  useEffect(() => {
    if (answers.length === questions.length) {
      execute();
    }
  }, [answers]);

  useEffect(() => {
    if (status === "error") {
      toastStore.value = {
        message: error.message,
        type: "error",
      };
    }
  }, [status]);

  if (answers.length < questions.length) return null;

  return (
    <div className="flex flex-col w-full h-screen p-2 items-center">
      <div className="flex flex-col justify-center w-full h-full items-center max-w-4xl">
        <div className="">
          <div className="mb-2">
            Câu hỏi được chọn ngẫu nhiên là:{" "}
            <b className="text-2xl">{fieldX}</b>
          </div>
          <div className="italic p-8">
            Tôi thấy{" "}
            <Input
              readonly={true}
              width="100px"
              type="number"
              value={amountFromUser}
            />{" "}
            <b>VND</b> cho tôi ngay ngày hôm nay và{" "}
            <b className="text-xl text-blue-500">{fieldMFormatted} VND</b> cho{" "}
            {fieldA} sau <b className="text-xl text-blue-500">{fieldT} ngày </b>{" "}
            là bằng nhau về giá trị.
          </div>
          <div className="mb-8">
            Giá trị thăm được rút ngẫu nhiên là:{" "}
            <b className="text-2xl">{fieldYFormatted} VND</b>
          </div>
          <div>
            {isSendToOrg ? (
              <div>
                Chúng tôi sẽ gửi cho tổ chức{" "}
                <b>
                  {fieldA} {fieldMFormatted} VND
                </b>{" "}
                trong {fieldT} ngày.
                <br />
                Ban tổ chức sẽ gửi xác nhận đến email <b>{playerEmail}</b> khi
                khoản tiền này đã được đóng góp cho {fieldA}
              </div>
            ) : (
              <div>
                Chúng tôi sẽ gửi cho bạn <b>{fieldYFormatted} VND</b> bằng tiền
                mặt.
                <div className="mt-8 font-bold text-2xl text-blue-500 flex justify-center">
                  Vui lòng đưa màn hình này cho chúng tôi để ghi nhận giải
                  thưởng
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
