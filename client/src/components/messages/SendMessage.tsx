import { ChangeEvent, FormEvent, useState } from "react";
import { BsSend } from "react-icons/bs";
import { useAction } from "../../hooks/useAction";
import { toast } from "sonner";
import { useSelectConversation } from "../../zustand/useSelectConversation";
import { useDispatch, useSelector } from "react-redux";
import { messageActions } from "../../redux/messageSlice";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const {
    messages: { messages },
  } = useSelector((state) => state) as { messages: any };
  const dispatch = useDispatch();
  const { conversation } = useSelectConversation();
  const { excute, isLoading } = useAction(
    `/api/messages/send/${conversation?._id}`,
    {
      onSuccess(data) {
        const allMessage = [...messages, data];
        dispatch(messageActions.setMessages(allMessage));
      },
      onError(error) {
        toast.error(error);
      },
      onComplete() {
        setMessage("");
      },
    }
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message) return;

    excute({ mode: "send", data: { message } });
  };

  return (
    <form onSubmit={onSubmit} className="px-4 my-3">
      <div className="w-full relative">
        <input
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          type="text"
          name="text"
          value={message}
          placeholder="Message..."
          onChange={onChange}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {isLoading ? (
            <span className="loading loading-spinner text-white/70 w-3 h-3" />
          ) : (
            <BsSend className="w-3 h-3" />
          )}
        </button>
      </div>
    </form>
  );
};
export default SendMessage;
