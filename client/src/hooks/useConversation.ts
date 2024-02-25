import axios from "axios";
import { useEffect, useState } from "react";

interface Option {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useConversation = (url: string, option?: Option) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const excute = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);

        option?.onSuccess?.(data.data.users);
      } catch (error) {
        option?.onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };
    excute();
  }, [url]);

  return { isLoading };
};
