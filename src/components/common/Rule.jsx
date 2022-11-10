import { Input, ListItem, UnorderedList } from "@chakra-ui/react";

const numberFormatter = new Intl.NumberFormat();

const Rule = ({ stateMachine }) => {
  const fieldA = stateMachine.context.fieldA;
  const exampleXMoney = 150000;
  const exampleXMoneyFormatted = numberFormatter.format(exampleXMoney);

  return (
    <>
      <div className="mb-4">
        Trò chơi bao gồm 25 câu hỏi, bạn phải trả lời mỗi câu hỏi bằng một số
        tiền bất kỳ mà bạn cho là hợp lý. Sau khi nhận được phiếu trả lời từ
        bạn, ban tổ chức sẽ chọn ngẫu nhiên 1 câu hỏi trong 25 câu hỏi này để
        tính tiền trả cho bạn hoặc tổ chức thiện nguyện. Vì vậy, hãy trả lời tất
        cả 25 câu nhé!
      </div>
      <div className="mt-4">
        Sau khi chọn được câu hỏi, ban tổ chức sẽ tiếp tục bốc thăm để quyết
        định số tiền chi trả cho bạn hoặc tổ chức thiện nguyện bạn chọn.
      </div>

      <div>Ví dụ câu hỏi được chọn là:</div>
      <div className="p-8 text-cyan-600 italic">
        Tôi thấy{" "}
        <Input
          width="100px"
          type="number"
          readonly={true}
          value={exampleXMoney}
        />{" "}
        <b>VND</b> cho tôi ngay ngày hôm nay và <b>200,000 VND</b> cho{" "}
        <b>{fieldA}</b> sau <b>30 ngày (C)</b> là bằng nhau về giá trị.
        <div className="flex justify-center mt-4">
          Bạn điền vào chỗ trống{" "}
          <div className="font-bold ml-1">{exampleXMoneyFormatted} VND</div>.
        </div>
      </div>
      <div className="mt-2">
        Ban tổ chức sẽ bốc thăm ngẫu nhiên từ 5,000 VND đến 200,000VND. Nếu số
        tiền trên thăm nhỏ hơn hoặc bằng số tiền bạn điền (
        {exampleXMoneyFormatted} VND), chúng tôi sẽ gửi cho {fieldA} 200,000 VND
        sau 30 ngày kể từ khi nhận được phiếu trả lời của bạn. Nếu số tiền trên
        thăm lớn hơn số tiền bạn điền, ví dụ thăm bốc lên là 165,000 VND, chúng
        tôi sẽ trả cho bạn 165,000 VND ngay khi nhận được phiếu trả lời.
      </div>
      <UnorderedList className="mt-2">
        <ListItem>
          <i>Lưu ý 1:</i> Giá trị bạn điền vào chỗ trống càng cao, khả năng bạn
          được trả tiền càng thấp, khả năng tổ chức bạn chọn được trả tiền càng
          cao. Nếu bạn điền giá trị A đúng bằng giá trị B tức là bạn chọn không
          nhận lại gì cả và trao toàn bộ số tiền B cho tổ chức thiện nguyện.
        </ListItem>
      </UnorderedList>
    </>
  );
};

export default Rule;
