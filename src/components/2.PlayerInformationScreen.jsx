import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { formRules, useFormValidator } from "../helpers/FormValidator/index.js";
import { useCreatePlayerInfo } from "../api/index.js";
import { useEffect } from "preact/hooks";
import { toastStore } from "../store/toast.js";

const salaries = [
  "Không có thu nhập",
  "Dưới 1 triệu",
  "Từ 1 triệu đến dưới 10 triệu",
  "Từ 10 triệu đến dưới 20 triệu",
  "Từ 20 triệu đến dưới 50 triệu",
  "Từ 50 triệu đến dưới 100 triệu",
  "Từ 100 triệu trở lên",
];

const sexes = ["Nam", "Nữ", "Khác"];

const PlayerInformationScreen = ({ stateMachine, sendMachineEvent }) => {
  const { formData, formErrors, validate, setFieldValue } = useFormValidator({
    defaultData: {
      email: "",
      yearOfBirth: null,
      sex: "",
      salary: null,
      version: stateMachine.context.version,
    },
    rules: {
      email: [formRules.required(), formRules.email()],
      yearOfBirth: [
        formRules.required(),
        formRules.number(),
        formRules.maxLength(4),
        formRules.minLength(4),
      ],
      sex: [formRules.required()],
      salary: [formRules.required()],
    },
  });

  const { status, execute, error, data } = useCreatePlayerInfo();

  useEffect(() => {
    if (status === "success") {
      sendMachineEvent({
        type: "NEXT",
        payload: { ...formData, playerId: data.id },
      });
    } else if (status === "error") {
      if (error.data?.data?.email?.code === "validation_not_unique") {
        toastStore.value = {
          message: "This email already exists",
          type: "error",
        };
      } else {
        toastStore.value = {
          message: error.message,
          type: "error",
        };
      }
    }
  }, [status]);

  const onNext = () => {
    const { isValid } = validate(formData);

    if (isValid) {
      execute(formData);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen p-2 items-center">
      <div className="flex flex-col justify-center w-full h-full items-center max-w-4xl">
        <div className="font-bold text-xl mb-4">
          Phần I: Thông Tin Nhân Khẩu Học
        </div>
        <div className={"mb-6"}>
          Thông tin của bạn sẽ chỉ được dùng trong khuôn khổ nghiên cứu này, và
          được lưu trữ riêng biệt sao cho không thể được dùng để định danh.
        </div>
        <div>
          <FormControl w={[300, 400]} isInvalid={!!formErrors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(event) => {
                setFieldValue({ email: event.target.value });
              }}
              size="lg"
            />
            {!!formErrors.email && (
              <FormErrorMessage>{formErrors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            className="mt-4"
            w={[300, 400]}
            isInvalid={!!formErrors.yearOfBirth}
          >
            <FormLabel>Năm sinh</FormLabel>
            <Input
              type="number"
              value={formData.yearOfBirth}
              onChange={(event) => {
                setFieldValue({ yearOfBirth: event.target.value });
              }}
              size="lg"
            />
            {!!formErrors.yearOfBirth && (
              <FormErrorMessage>{formErrors.yearOfBirth}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            className="mt-4"
            w={[300, 400]}
            isInvalid={!!formErrors.sex}
          >
            <FormLabel>Giới tính</FormLabel>
            <Select
              value={formData.sex}
              onChange={(event) => {
                setFieldValue({ sex: event.target.value });
              }}
              size="lg"
            >
              <option value="">Vui lòng chọn</option>
              {sexes.map((sex) => (
                <option value={sex}>{sex}</option>
              ))}
            </Select>
            {!!formErrors.sex && (
              <FormErrorMessage>{formErrors.sex}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            className="mt-4"
            w={[300, 400]}
            isInvalid={!!formErrors.salary}
          >
            <FormLabel>
              Tháng trước, bạn đã nhận được mức thu nhập là bao nhiêu (bao gồm
              tiền công/tiền lương/lợi nhuận và tiền làm thêm giờ/tiền
              thưởng/tiền phụ cấp)?
            </FormLabel>
            <Select
              value={formData.salary}
              onChange={(event) => {
                setFieldValue({ salary: event.target.value });
              }}
              size="lg"
            >
              <option value="">Vui lòng chọn</option>
              {salaries.map((salary) => (
                <option value={salary}>{salary}</option>
              ))}
            </Select>
            {!!formErrors.salary && (
              <FormErrorMessage>{formErrors.salary}</FormErrorMessage>
            )}
          </FormControl>
        </div>
      </div>
      <div className="flex mb-4 w-full justify-between">
        <div className="flex-1" />
        <Button
          onClick={onNext}
          disabled={
            Object.values(formErrors).some((error) => !!error) ||
            status === "loading"
          }
          colorScheme="blue"
          className="font-bold text-lg"
          size="lg"
        >
          Tiếp theo >>
        </Button>
      </div>
    </div>
  );
};

export default PlayerInformationScreen;
