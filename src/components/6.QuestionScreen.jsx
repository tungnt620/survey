import {
  Box,
  Button,
  Input,
  Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack,
} from "@chakra-ui/react";
import {useState} from "preact/hooks";
import {MdOutlineAttachMoney} from "react-icons/md";

const numberFormatter = new Intl.NumberFormat();

const QuestionScreen = ({stateMachine, sendMachineEvent}) => {
  const fieldA = stateMachine.context.fieldA;
  const questions = stateMachine.context.questions;
  const currentQuestionNo = stateMachine.context.currentQuestionNo;
  const currentQuestionIndex = currentQuestionNo - 1;

  const fieldM = questions[currentQuestionIndex].fieldM;
  const fieldT = questions[currentQuestionIndex].fieldT;

  const version = stateMachine.context.version;
  const [amount, setAmount] = useState(Math.floor(Math.floor(fieldM / 2) / 5000) * 5000);

  const onNext = () => {
    if (currentQuestionNo === questions.length) {
      sendMachineEvent('FINISH');
    } else {
      sendMachineEvent('NEXT_QUESTION')
    }
  }

  const amountFormatted = numberFormatter.format(amount);
  const fieldMFormatted = numberFormatter.format(fieldM);

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='flex flex-col justify-center w-full h-full items-center'>
        <div className='pr-16 pl-16'>
          <div className='mb-4'>
            <b>Điền vào chỗ trống:</b>
          </div>
          <div className='mb-4'>
            Tôi thấy <Input readonly={true} width='100px' type='number' value={amount}/> <b>VND</b> cho tôi ngay
            ngày hôm nay
            và <b>{fieldMFormatted} VND</b> cho <b>{fieldA}</b> sau <b>{fieldT} ngày </b> là bằng nhau về giá trị.
          </div>
          <div className='mt-16 max-w-screen-md'>
            <Slider defaultValue={amount} min={5000} max={fieldM} step={5000} onChange={(val) => setAmount(val)}>
              <SliderMark
                value={amount}
                textAlign='center'
                bg='blue.500'
                color='white'
                mt='-12'
                ml='-16'
                w='32'
                fontSize={18}
                borderRadius={4}
              >
                {amountFormatted} VND
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack/>
              </SliderTrack>
              <SliderThumb boxSize={8}>
                <Box color='tomato' as={MdOutlineAttachMoney} size={20}/>
              </SliderThumb>
            </Slider>
          </div>
        </div>
      </div>
      <div className='flex mb-4 mr-4 mt-4'>
        <div className='pl-16'>
          <Button className='font-bold text-lg'>
            Xem luật chơi
          </Button>
        </div>
        <div className='flex-1'/>
        <Button onClick={onNext} disabled={!amount} colorScheme='blue' className='font-bold text-lg'>
          Tiếp theo >>
        </Button>
      </div>
    </div>
  );
};

export default QuestionScreen;
