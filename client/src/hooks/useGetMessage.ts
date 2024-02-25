import axios from "axios";
import { useEffect, useState } from "react";

interface Option {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onComplete?: () => void;
}

export const useGetMessage = (url: string, option?: Option) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const excute = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(url);

        option?.onSuccess?.(data.data);
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
