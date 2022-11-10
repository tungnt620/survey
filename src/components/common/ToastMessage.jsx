import { useToast } from "@chakra-ui/react";
import { toastStore } from "../../store/toast.js";
import { useEffect } from "preact/hooks";

const ToastMessage = () => {
  const toast = useToast();

  const { message, type } = toastStore.value;

  useEffect(() => {
    console.log("toastStore.value", toastStore.value);

    if (message && type) {
      toast({
        title: message,
        status: type,
        duration: type === "error" ? 1000 * 1000 : 5000,
        isClosable: true,
      });
    }
  }, [message, type]);

  return null;
};

export default ToastMessage;
