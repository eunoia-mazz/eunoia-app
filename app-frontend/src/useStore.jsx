import { create } from "zustand";

const useStore = create((set) => ({
  clientId: localStorage.getItem("clientId") || null,
  setClientId: (clientId) => {
    localStorage.setItem("clientId", clientId);
    set({ clientId });
  },

  firstName: localStorage.getItem("firstName") || "",
  setFirstName: (firstName) => {
    localStorage.setItem("firstName", firstName);
    set({ firstName });
  },

  lastName: "",
  setLastName: (lastName) => set({ lastName }),

  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),

  currentChatId: null,
  setCurrentChatId: (currentChatId) => set({ currentChatId }),

  currentChat: [],
  setCurrentChat: (currentChat) => set({ currentChat }),

  addNewMessage: (newMessage) =>
    set((state) => ({ currentChat: [...state.currentChat, newMessage] })),
}));

export default useStore;
