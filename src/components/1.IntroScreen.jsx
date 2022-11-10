import { useGetVersion } from "../helpers";
import { Button } from "@chakra-ui/react";

const IntroScreen = ({ sendMachineEvent }) => {
  const version = useGetVersion();

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-col justify-center w-full h-full items-center">
        <div className="font-bold text-base mb-14">
          Fulbright School of Public Policy and Management
        </div>
        <div className="font-bold text-5xl mb-14">
          “Trò chơi” Ưu tiên thời gian ({version})
        </div>
        <div>Người khảo sát: Nguyễn Minh Hiếu</div>
        <div>
          Email:{" "}
          <a
            className="text-cyan-400"
            href="mailto:mpp23.hieunguyen@student.fulbright.edu.vn"
          >
            mpp23.hieunguyen@student.fulbright.edu.vn
          </a>
        </div>
        <div>SĐT: 0909967688</div>
      </div>
      <div className="flex mb-4 mr-4">
        <div className="flex-1" />
        <Button
          onClick={() => sendMachineEvent("NEXT")}
          colorScheme="blue"
          className="font-bold text-lg"
        >
          Bắt đầu
        </Button>
      </div>
    </div>
  );
};

export default IntroScreen;
