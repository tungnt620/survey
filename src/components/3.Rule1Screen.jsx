import {
  Button,
  FormControl,
  FormErrorMessage,
  ListItem,
  Select,
  UnorderedList,
} from "@chakra-ui/react";
import { formRules, useFormValidator } from "../helpers/FormValidator/index.js";
import { useUpdatePlayerInfo } from "../api/index.js";
import { useEffect } from "preact/hooks";
import { toastStore } from "../store/toast.js";

const Rule1Screen = ({ stateMachine, sendMachineEvent }) => {
  const { formData, formErrors, validate, setFieldValue } = useFormValidator({
    defaultData: {
      fieldA: "",
    },
    rules: {
      fieldA: [formRules.required()],
    },
  });

  const { status, execute, error } = useUpdatePlayerInfo(
    stateMachine.context.playerId,
    formData
  );

  useEffect(() => {
    if (status === "success") {
      sendMachineEvent({
        type: "NEXT",
        payload: formData,
      });
    } else if (status === "error") {
      toastStore.value = {
        message: error.message,
        type: "error",
      };
    }
  }, [status]);

  const onNext = () => {
    const { isValid } = validate(formData);

    if (isValid) {
      execute();
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col justify-center w-full h-full items-center">
        <div className="font-bold text-xl mb-8">Phần II: Luật chơi</div>
        <div className="pr-16 pl-16">
          <div className="mb-4">
            Tùy theo lựa chọn của bạn, trò chơi này sẽ có 1 trong 2 kết cục:
          </div>
          <UnorderedList>
            <ListItem>
              Bạn sẽ được chi trả một số tiền trong khoảng <b>5,000 VND</b> đến{" "}
              <b>290,000 VND</b> sau 1 ngày.
            </ListItem>
            <ListItem>
              Tổ chức thiện nguyện mà bạn lựa chọn sẽ được chi trả khoảng tiền
              từ <b>50,000 VND</b> cho đến <b>290,000 VND</b> sau khoảng thời
              gian từ <b>3 ngày</b> cho đến <b>60 ngày</b>.
            </ListItem>
          </UnorderedList>
          <div className="mt-4">
            Vui lòng chọn tổ chức thiện nguyện mà bạn muốn nhóm nghiên cứu chi
            trả:
          </div>
          <FormControl width="400px" isInvalid={!!formErrors.fieldA}>
            <Select
              value={formData.fieldA}
              onChange={(event) => {
                setFieldValue({ fieldA: event.target.value });
              }}
            >
              <option value="">Vui lòng chọn 1 tổ chức thiện nguyện</option>
              <option value="Org 1">Org 1</option>
              <option value="Org 2">Org 2</option>
              <option value="Org 3">Org 3</option>
            </Select>
            {!!formErrors.fieldA && (
              <FormErrorMessage>{formErrors.fieldA}</FormErrorMessage>
            )}
          </FormControl>
        </div>
      </div>
      <div className="flex mb-4 mr-4">
        <div className="flex-1" />
        <Button
          onClick={onNext}
          disabled={
            Object.values(formErrors).some((error) => !!error) ||
            status === "loading"
          }
          colorScheme="blue"
          className="font-bold text-lg"
        >
          Tiếp theo >>
        </Button>
      </div>
    </div>
  );
};

export default Rule1Screen;
