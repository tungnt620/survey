import { Button, Checkbox, ListItem, UnorderedList } from "@chakra-ui/react";
import { useState } from "preact/hooks";

const Rule3Screen = ({ sendMachineEvent }) => {
  const [checked, setChecked] = useState(false);

  const onNext = () => {
    sendMachineEvent("NEXT");
  };

  return (
    <div className="flex flex-col w-full h-screen p-2 items-center">
      <div className="flex flex-col justify-center w-full h-full max-w-4xl">
        <div className="pr-16 pl-16">
          <div className="flex justify-center text-xl font-bold text-red-600 mb-8">
            Vui lòng đọc kỹ nội dung sau đây
          </div>
          <div className="mb-6">
            Nghiên cứu này quan sát cách mà con người đưa ra lựa chọn giữa lợi
            ích cá nhân trong hiện tại và lợi ích xã hội tương lai. Những câu
            hỏi trong bài này mô phỏng những quyết định thực tế lớn hơn: như
            việc tiếp tục dùng nhiên liệu hóa thạch (lợi ích ngay trong thế hệ
            này), hay đầu tư phát triển nhiên liệu sạch (lợi ích nhiều hơn cho
            các thế hệ sau).
          </div>
          <div className="mt-4">
            Theo lý thuyết kinh tế, có hai yếu tố ảnh hưởng đến lựa chọn này:
          </div>
          <UnorderedList className="mt-2">
            <ListItem>
              <b>Bản năng thiếu kiên nhẫn của con người:</b> chúng ta luôn muốn
              lợi ích ngay lập tức hơn là trong tương lai
            </ListItem>
            <ListItem>
              <b>Công bằng xã hội:</b> tương tự như phân chia lợi ích nhiều hơn
              cho người nghèo và ít hơn cho người giàu. Nếu chúng ta cho rằng
              thế hệ tương lai giàu hơn, thì lý thuyết công bằng cho rằng ta nên
              đầu tư ít hơn cho họ. Còn nếu thế hệ tương lai nghèo hơn, thì
              chúng ta nên phân bổ đầu tư nhiều hơn cho họ.
            </ListItem>
          </UnorderedList>
        </div>
      </div>
      <div className="flex mb-4 mt-4 w-full justify-between">
        <div className="pl-16">
          <Checkbox
            size={"lg"}
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          >
            Tôi đã hiểu
          </Checkbox>
        </div>
        <div className="flex-1" />
        <Button
          size={"lg"}
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

export default Rule3Screen;
