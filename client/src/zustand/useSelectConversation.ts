import { create } from "zustand";
import { User } from "../types/types";

interface Props {
  conversation: null | User;
  setConversation: (conversation: User | null) => void;
}

export const useSelectConversation = create<Props>((set) => ({
  conversation: null,
  setConversation: (data) => set({ conversation: data }),
}));
