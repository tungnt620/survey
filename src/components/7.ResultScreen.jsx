import { useUpdatePlayerInfo } from "../api/index.js";
import { useEffect, useMemo } from "preact/hooks";
import { toastStore } from "../store/toast.js";
import { Input } from "@chakra-ui/react";

const numberFormatter = new Intl.NumberFormat();

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const ResultScreen = ({ context }) => {
  const playerEmail = context.email;
  const fieldA = context.fieldA;
  const questions = context.questions;
  const answers = context.answer;

  const isDataSynced = answers.length === questions.length;

  const fieldX = useMemo(() => random(1, questions.length + 1), []);
  const selectedQuestionIndex = fieldX - 1;

  const amountFromUser =
    answers.length === questions.length
      ? answers[selectedQuestionIndex].amount
      : 0;
  const fieldM = questions[selectedQuestionIndex].fieldM;
  const fieldT = questions[selectedQuestionIndex].fieldT;

  const fieldY = useMemo(() => {
    if (isDataSynced) {
      const options = [];
      for (let i = 5000; i <= fieldM; i = i + 5000) {
        options.push(i);
      }
      return options[Math.floor(Math.random() * options.length)];
    }

    return 0;
  }, [fieldM, isDataSynced]);

  const fieldYFormatted = numberFormatter.format(fieldY);
  const fieldMFormatted = numberFormatter.format(fieldM);

  const isSendToOrg = fieldY <= amountFromUser;

  const { status, execute, error } = useUpdatePlayerInfo();

  useEffect(() => {
    if (isDataSynced) {
      execute(context.playerId, {
        selectedQuestionNo: fieldX,
        fieldY,
        fieldM,
        amountFromUser,
        fieldT,
        decision: isSendToOrg ? "sendToOrg" : "sendToUser",
      });
    }
  }, [isDataSynced]);

  useEffect(() => {
    if (status === "error") {
      console.log({
        error,
      });
      toastStore.value = {
        message: error.message,
        type: "error",
      };
    }
  }, [status]);

  if (!isDataSynced) return null;

  return (
    <div className="flex flex-col w-full h-screen p-2 items-center">
      <div className="flex flex-col justify-center w-full h-full items-center max-w-4xl">
        <div className="">
          <div className="mb-2">
            C??u h???i ???????c ch???n ng???u nhi??n l??:{" "}
            <b className="text-2xl">{fieldX}</b>
          </div>
          <div className="italic p-8">
            T??i th???y{" "}
            <Input
              readonly={true}
              width="100px"
              type="number"
              value={amountFromUser}
            />{" "}
            <b>VND</b> cho t??i ngay ng??y h??m nay v??{" "}
            <b className="text-xl text-blue-500">{fieldMFormatted} VND</b> cho{" "}
            {fieldA} sau <b className="text-xl text-blue-500">{fieldT} ng??y </b>{" "}
            l?? b???ng nhau v??? gi?? tr???.
          </div>
          <div className="mb-8">
            Gi?? tr??? th??m ???????c r??t ng???u nhi??n l??:{" "}
            <b className="text-2xl">{fieldYFormatted} VND</b>
          </div>
          <div>
            {isSendToOrg ? (
              <div>
                Ch??ng t??i s??? g???i <b>{fieldMFormatted} VND</b> cho{" "}
                <b>
                  {fieldA} {fieldMFormatted} VND
                </b>{" "}
                trong {fieldT} ng??y.
                <br />
                Ban t??? ch???c s??? g???i x??c nh???n ?????n email <b>{playerEmail}</b> khi
                kho???n ti???n n??y ???? ???????c ????ng g??p cho {fieldA}
              </div>
            ) : (
              <div>
                Ch??ng t??i s??? g???i cho b???n <b>{fieldYFormatted} VND</b> b???ng ti???n
                m???t.
                <div className="mt-8 font-bold text-2xl text-blue-500 flex justify-center">
                  Vui l??ng ????a m??n h??nh n??y cho ch??ng t??i ????? ghi nh???n gi???i
                  th?????ng
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
