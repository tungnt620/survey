import {
  Button, Checkbox,
  ListItem,
  UnorderedList
} from "@chakra-ui/react";
import {useState} from "preact/hooks";

const Rule3Screen = ({sendMachineEvent}) => {
  const [checked, setChecked] = useState(false);

  const onNext = () => {
    sendMachineEvent('NEXT')
  }

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='flex flex-col justify-center w-full h-full'>
        <div className='pr-16 pl-16'>
          <div className='mb-4'>
            Diễn giải: Ưu tiên thời gian đối với xã hội nghiên cứu về cách mà xã hội định giá những lợi ích hiện tại so
            với lợi ích tương lai. Thực tế, giữa phương án có 100,000VND ngay hôm nay và 100,000VND sau 1 tuần, hầu hết
            tất cả chúng ta đều sẽ chọn có tiền ngay. Vậy có thể nói, lợi ích xuất hiện trong hiện tại thường được xem
            là đáng giá hơn là chính nó xuất hiện trong tương lai.
          </div>
          <div className='mt-4'>
            Mặc dù ưu tiên thời gian của mỗi người có thể dễ dàng được quan sát, ưu tiên thời gian của xã hội là vấn đề
            phức tạp hơn nhiều. Hiện nay, các nhà kinh tế học thống nhất 3 yếu tố cần xem xét khi xác định ưu tiên thời
            gian của xã hội là:
          </div>
          <UnorderedList className='mt-2'>
            <ListItem><b>Suất chiết khấu thuần túy:</b> thể hiện cho bản tính “thiếu kiên nhẫn” của mỗi con
              người</ListItem>
            <ListItem><b>Công bằng xã hội:</b> việc lựa chọn giữa tiêu dùng ngay hôm nay hay để dành cho ngày hôm sau
              bản chất là hoạt động phân chia tài sản giữa xã hội hiện tại và xã hội tương lai. Cụ thể, nếu tương lai
              giàu hơn thì nên phân phối cho họ ít hơn, còn tương lai nghèo hơn thì nên phân phối cho họ nhiều
              hơn.</ListItem>
          </UnorderedList>
        </div>
      </div>
      <div className='flex mb-4 mr-4 mt-4'>
        <div className='pl-16'>
          <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)}>Tôi đã hiểu</Checkbox>
        </div>
        <div className='flex-1'/>
        <Button onClick={onNext} disabled={!checked} colorScheme='blue' className='font-bold text-lg'>
          Tiếp theo >>
        </Button>
      </div>
    </div>
  );
};

export default Rule3Screen;
