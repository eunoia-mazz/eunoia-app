import { create } from "zustand";
const useStore = create((set) => ({
  clientId: null,
  setClientId: (clientId) => set(() => ({ clientId })),

  currentChatId: null,
  setCurrentChatId: (currentChatId) => set(() => ({ currentChatId })),

  currentChat: [],
  setCurrentChat: (currentChat) => set(() => ({ currentChat })),
  addNewMessage: (newMessage) =>
    set((state) => ({ currentChat: [...state.currentChat, newMessage] })),
}));

export default useStore;
