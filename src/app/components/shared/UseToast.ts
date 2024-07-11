import { addToast, removeToast } from "@/redux/features/toast/toastSlice";
import { useAppDispatch } from "@/redux/hooks";

const useToast = () => {
  const dispatch = useAppDispatch();

  const performToast = (text: string) => {
    const id = new Date().getTime();
    const toast = { id, text };
    dispatch(addToast(toast));
    setTimeout(() => {
      dispatch(removeToast(id));
    }, 1000);
  };

  return { performToast };
};

export default useToast;
