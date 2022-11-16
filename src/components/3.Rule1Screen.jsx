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

const orgs = [
  {
    name: "Y tế - Hội chữ thập đỏ - Red Cross Vietnam",
    description:
      "Hội Chữ thập đỏ Việt Nam là tổ chức xã hội nhân đạo của quần chúng. Hội chăm lo hỗ trợ về vật chất và tinh thần cho những người khó khăn, nạn nhân chiến tranh, nạn nhân thiên tai, thảm họa; tham gia chăm sóc sức khỏe ban đầu cho nhân dân; vận động các tổ chức, cá nhân tham gia các hoạt động nhân đạo do Hội tổ chức.\n",
  },
  {
    name: "Blue Dragon Children’s Foundation",
    description:
      "Tổ chức Trẻ em Rồng Xanh (tên tiếng Anh: Blue Dragon Children's Foundation) là một tổ chức phi chính phủ có trụ sở tại Hà Nội, Việt Nam. Sứ mệnh của tổ chức này bao gồm giải cứu trẻ em đường phố, trẻ em, phụ nữ thoát khỏi nạn buôn bán người, lao động cưỡng bức và nô lệ, đồng thời cung cấp nơi ở, giáo dục và việc làm cho các nạn nhân sau khi được giải cứu.",
  },
  {
    name: "Trung tâm bảo tồn thiên nhiên Gaia - Gaia Nature Conservation",
    description:
      "Trung tâm bảo tồn thiên nhiên Gaia trao quyền và thúc đẩy thực hiện các hoạt động bảo tồn thiên nhiên, bảo vệ môi trường, đặc biệt tại Việt Nam nhằm tạo dựng một tương lai nơi con người sống hòa hợp với Mẹ Thiên nhiên.\n" +
      "Hiện nay Trung tâm đang tổ chức trồng rừng tại Vườn Quốc Gia Bạch Mã vào tháng 12/2022. Với mỗi 95,000 VND quyên góp là bạn đã trồng được một cây gỗ lớn tại Vườn Quốc Gia Bạch Mã, giúp giảm thiên tai bão lũ ở vùng hạ lưu, hấp thụ CO2, và bảo tồn đa dạng sinh học nơi đây.  ",
  },
  {
    name: "Hội Bảo trợ người khuyết tật và trẻ em mồ côi Thành phố Hồ Chí Minh",
    description:
      "Hội Bảo trợ Người khuyết tật và Trẻ mồ côi TPHCM thành lập năm 1999 nhằm kêu gọi sự đóng góp của xã hội, của các nhà hảo tâm chăm lo cho người khuyết tật và trẻ mồ côi, tạo điều kiện cho các cháu học tập, phát triển và hòa nhập với cuộc sống xã hội. Qua hơn 20 năm hoạt động với nhiều cố gắng, Hội Bảo trợ Người khuyết tật và Trẻ mồ côi TPHCM đã được các tổ chức, cá nhân đồng hành đem lại những lợi ích thiết thực cho những người kém may mắn, có cơ hội vươn lên trong cuộc sống…",
  },
  {
    name: "Cứu hộ chó mèo Sài Gòn Time – SGT",
    description: (
      <div>
        Giải cứu các bé chó mèo tại Sài Gòn:
        <UnorderedList className="mt-2">
          <ListItem>Trong hoàn cảnh cận kề với cái chết.</ListItem>
          <ListItem>Bị bỏ rơi vì già nua, bệnh tật.</ListItem>
          <ListItem>Bị lạc chủ.</ListItem>
        </UnorderedList>
      </div>
    ),
  },
];

const Rule1Screen = ({ stateMachine, sendMachineEvent }) => {
  const version = stateMachine.context.version;
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
        type: "NEXT" + "_" + version.toUpperCase(),
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
    <div className="flex flex-col w-full h-screen p-2 items-center">
      <div className="flex flex-col justify-center w-full h-full items-center max-w-4xl">
        <div className="font-bold text-xl mb-8">Phần II: Luật chơi</div>
        <div>
          <div className="mb-4">
            Tùy theo kết cục trò chơi, chúng tôi sẽ gửi tiền thưởng cho bạn HOẶC
            một tổ chức thiện nguyện mà bạn chọn dưới đây.
            <br />
            Vui lòng chọn tổ chức thiện nguyện nhận tiền thưởng:{" "}
          </div>
          <FormControl
            className="mt-4"
            w={[300, 700]}
            isInvalid={!!formErrors.fieldA}
          >
            <Select
              value={formData.fieldA}
              onChange={(event) => {
                setFieldValue({ fieldA: event.target.value });
              }}
              size="lg"
            >
              <option value="">Vui lòng chọn 1 tổ chức thiện nguyện</option>
              {orgs.map((org) => (
                <option value={org.name}>{org.name}</option>
              ))}
            </Select>
            {!!formErrors.fieldA && (
              <FormErrorMessage>{formErrors.fieldA}</FormErrorMessage>
            )}
          </FormControl>
          <div className={"mt-4"}>
            {orgs.find((org) => org.name === formData.fieldA)?.description}
          </div>
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
          size={"lg"}
        >
          Tiếp theo >>
        </Button>
      </div>
    </div>
  );
};

export default Rule1Screen;
