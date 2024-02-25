import axios from "axios";
import { useState } from "react";

interface Option {
  onSuccess?: (data: unknown) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

type DataObj =
  | {
      mode: "login";
      data: {
        password: string;
        username: string;
      };
    }
  | {
      mode: "signup";
      data: {
        password: string;
        username: string;
        passwordConfirm: string;
        gender: "male" | "female";
        fullName: string;
      };
    }
  | {
      mode: "logout";
      data: null;
    }
  | {
      mode: "send";
      data: {
        message: string;
      };
    };

export const useAction = (url: string, option?: Option) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const excute = async (dataObj: DataObj) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(url, dataObj.data);
      if (dataObj.mode === "send") {
        option?.onSuccess?.(data.data.message);
      } else {
        option?.onSuccess?.(data);
      }
    } catch (error: any) {
      console.log(error);
      option?.onError?.(error.response.data.message as string);
    } finally {
      setIsLoading(false);
      option?.onComplete?.();
    }
  };

  return { isLoading, excute };
};
