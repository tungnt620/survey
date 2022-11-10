import { useGetVersion } from "../helpers";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { formRules, useFormValidator } from "../helpers/FormValidator/index.js";

const PlayerInformationScreen = ({ sendMachineEvent }) => {
  const { formData, formErrors, validate, setFieldValue } = useFormValidator({
    defaultData: {
      email: "",
      yearOfBirth: null,
    },
    rules: {
      email: [formRules.required(), formRules.email()],
      yearOfBirth: [
        formRules.required(),
        formRules.number(),
        formRules.maxLength(4),
        formRules.minLength(4),
      ],
    },
  });

  const onNext = () => {
    const { isValid } = validate(formData);

    if (isValid) {
      sendMachineEvent({ type: "NEXT", payload: formData });
    }
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col justify-center w-full h-full items-center">
        <div className="font-bold text-base mb-4">Some thank you text</div>
        <div className="font-bold text-xl mb-8">
          Phần I: Thông Tin Nhân Khẩu Học (do I need to blind myself from this
          information?)
        </div>
        <div>
          <FormControl width="400px" isInvalid={!!formErrors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(event) => {
                setFieldValue({ email: event.target.value });
              }}
            />
            {!!formErrors.email && (
              <FormErrorMessage>{formErrors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            className="mt-4"
            width="400px"
            isInvalid={!!formErrors.yearOfBirth}
          >
            <FormLabel>Năm sinh</FormLabel>
            <Input
              type="number"
              value={formData.yearOfBirth}
              onChange={(event) => {
                setFieldValue({ yearOfBirth: event.target.value });
              }}
            />
            {!!formErrors.yearOfBirth && (
              <FormErrorMessage>{formErrors.yearOfBirth}</FormErrorMessage>
            )}
          </FormControl>
        </div>
      </div>
      <div className="flex mb-4 mr-4">
        <div className="flex-1" />
        <Button
          onClick={onNext}
          disabled={Object.values(formErrors).some((error) => !!error)}
          colorScheme="blue"
          className="font-bold text-lg"
        >
          Tiếp theo >>
        </Button>
      </div>
    </div>
  );
};

export default PlayerInformationScreen;
